// reactive forms: https://www.youtube.com/watch?v=U9Xo0wXZIAg
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Component, OnInit, effect, inject, PLATFORM_ID, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Training } from '@src/_model/Training'
import { TrEvent } from '@src/_model/trevent'
import { AppImageComponent } from '@app/shared/components/app-image/app-image.component'
import { CommonModule, isPlatformBrowser } from '@angular/common'
import { MaterialModule } from '@src/_module/Material.Module'
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap'
import { AppSignalStore } from '@src/app/_store/Signal.Store'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { ErrorStateMatcher } from '@angular/material/core'

declare var $: any

@Component({
  selector: 'app-training-admin-details',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,MaterialModule,CommonModule,AppImageComponent,NgbAlert, MatFormFieldModule, MatSelectModule],
  templateUrl: './training-admin-details.component.html',
  styleUrl: './training-admin-details.component.scss'
})
export class TrainingAdminDetailsComponent implements OnInit {
  appSignalStore = inject(AppSignalStore);
  ratingErrorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl | null): boolean => {
      return !!(control && control.invalid && (control.dirty || control.touched));
    }
  };
  markColor = '#ff9efb';
  normalColor = '#4499ff';
  routeId: number = -1;
  training: Training | undefined;
  titleError: string = '';
  isSubmitted = false;
  ratings = Array.from({length: 10}, (_, i) => ({id: i + 1, title: (i + 1).toString()}));
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  private isBrowser: boolean;

  trainingForm: FormGroup = this.fb.group({
    title: ['',Validators.compose([Validators.required, Validators.maxLength(20)])],
    secondaryTitle: ['',Validators.compose([Validators.required, Validators.maxLength(40)])],
    shortDescription: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(80)]),
    ],
    longDescription: [null, Validators.compose([Validators.maxLength(280)])],
    rating: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    this.trainingForm.get('rating')?.valueChanges.subscribe(
      rating => {
        console.log('rating changed to ', rating);
      });

    this.routeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log('-------- id = ' + this.routeId);
    
    this.appSignalStore.loadTrainingAsync(this.routeId);
    this.training = this.appSignalStore.training.editData();
    console.log('-------- training = ', this.training);
          
    effect(() => {  
      console.log('The current tr is: ', this.appSignalStore.training.editData.title());
      this.trainingForm.setValue({
        title: this.appSignalStore.training.editData.title(), 
        secondaryTitle: this.appSignalStore.training.editData.secondaryTitle(), 
        shortDescription: this.appSignalStore.training.editData.shortDescription(), 
        longDescription: this.appSignalStore.training.editData.longDescription(), 
        rating: this.appSignalStore.training.editData.rating()
      });
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = null;
    }
  }

  async onSubmit() {
    if (!this.isBrowser) return;
    
    console.log('submitted form=', this.trainingForm.value, this.trainingForm.invalid);
    this.isSubmitted = true;
    this.trainingForm.markAsTouched();
    
    if (!this.trainingForm.get('rating')?.value) {
      this.trainingForm.get('rating')?.setValue(1);
    }
    
    if (!this.trainingForm.invalid) {
      const formData = {
        ...this.trainingForm.value,
        rating: Number(this.trainingForm.get('rating')?.value)
      };
      await this.appSignalStore.saveTrainingAsync(formData, this.selectedFile);
      this.appSignalStore.setFooterMessage('Training saved successfully');
    }
  }

  isTitleDirtyTouchedOrSubmitted(field: string) {
    return this.trainingForm.get(field)?.dirty || 
           this.trainingForm.get(field)?.touched || 
           this.isSubmitted;
  }

  isTitleValid() {
    this.titleError = '';
    if (!this.isTitleDirtyTouchedOrSubmitted('title')) return true;
    if (this.trainingForm.get('title')?.hasError('required')) {
      this.titleError = 'required';
      return false;
    }
    else if (this.trainingForm.get('title')?.hasError('maxlength')) {
      this.titleError = 'max length exceeded';
      return false;
    }
    return true;
  }

  validateRequiredTitle() {
    return this.trainingForm.get('title')?.hasError('required');
  }

  validateMaxLengthTitle() {
    return this.trainingForm.get('title')?.hasError('maxlength');
  }

  validateSecondaryTitle() {
    return this.trainingForm.get('secondaryTitle')?.hasError('required') && 
           (this.trainingForm.get('secondaryTitle')?.dirty || 
            this.trainingForm.get('secondaryTitle')?.touched || 
            this.isSubmitted);
  }

  validateShortDescription() {
    return this.trainingForm.get('shortDescription')?.hasError('required') && 
           (this.trainingForm.get('shortDescription')?.dirty || 
            this.trainingForm.get('shortDescription')?.touched || 
            this.isSubmitted);
  }

  validateLongDescription() {
    return this.trainingForm.get('longDescription')?.hasError('required') && 
           (this.trainingForm.get('longDescription')?.dirty || 
            this.trainingForm.get('longDescription')?.touched || 
            this.isSubmitted);
  }

  validateRole() {
    return this.trainingForm.get('roleId')?.invalid && 
           (this.trainingForm.get('roleId')?.dirty || 
            this.trainingForm.get('roleId')?.touched || 
            this.isSubmitted);
  }
}
