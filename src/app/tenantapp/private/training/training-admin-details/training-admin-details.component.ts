// reactive forms: https://www.youtube.com/watch?v=U9Xo0wXZIAg
// declare var require: any

//import { Observable } from "rxjs/observable";
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Component, OnInit, effect, inject, model } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms'
// import { MyErrorStateMatcher } from '@tenantapp/services/validation/myerrorstatematcher'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Training } from '@src/_model/Training'
import { TrEvent } from '@src/_model/trevent'
import { AppImageComponent } from '@app/shared/components/app-image/app-image.component'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '@src/_module/Material.Module'
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AppSignalStore } from '@src/app/_store/Signal.Store'
import { MatFormFieldModule } from '@angular/material/form-field'; // Added
import { MatSelectModule } from '@angular/material/select'; // Added
import { ErrorStateMatcher } from '@angular/material/core'
// import * as $ from 'jquery'
declare var $: any

@Component({
  selector: 'app-training-admin-details',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,MaterialModule,CommonModule,AppImageComponent,NgbAlert, MatFormFieldModule, MatSelectModule],// Added MatFormFieldModule, MatSelectModule
  // imports: [MaterialModule,CommonModule],
  templateUrl: './training-admin-details.component.html',
  styleUrl: './training-admin-details.component.scss'
})
export class TrainingAdminDetailsComponent implements OnInit {
  appSignalStore = inject(AppSignalStore)
  ratingErrorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl | null): boolean => {
      return !!(control && control.invalid && (control.dirty || control.touched));
    }
  };
  markColor = '#ff9efb'
  normalColor = '#4499ff'
  routeId: Number
  training: Training | undefined
  // training$: Observable<Training> = of(null)
  // file: File
  //  training: Training
  // rForm: FormGroup
  trainingForm: FormGroup = this.fb.group({
    title: ['',Validators.compose([Validators.required, Validators.maxLength(20)])],
    secondaryTitle: ['',Validators.compose([Validators.required, Validators.maxLength(40)])],
    shortDescription: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(80)]),
    ],
    longDescription: [null, Validators.compose([Validators.maxLength(280)])],
    rating: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
  })
  titleError:string=''
  isSubmitted = false;
  ratings = Array.from({length: 10}, (_, i) => ({id: i + 1, title: (i + 1).toString()}))
  selectedFile: File | null = null;
  selectedFileName: string | null = null; // Added this line

  constructor(
    // private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // console.log(
    //   'Constructor. training ' +
    //     require('util').inspect(this.training, false, null)
    // )

    // this.rForm = formBuilder.group({
    //   title: [
    //     "abbas",
    //     Validators.compose([Validators.required, Validators.maxLength(20)]),
    //   ],
    //   secondaryTitle: [
    //     null,
    //     Validators.compose([Validators.required, Validators.maxLength(40)]),
    //   ],
    //   shortDescription: [
    //     null,
    //     Validators.compose([Validators.required, Validators.maxLength(80)]),
    //   ],
    //   longDescription: [null, Validators.compose([Validators.maxLength(280)])],
    // })
    this.routeId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    console.log('-------- id = ' + this.routeId)
    this.appSignalStore.loadTrainingAsync(this.routeId);
    this.training=this.appSignalStore.training.editData();
    console.log('-------- training = ', this.training)
          

    effect(() => {  
      // console.log(`The current tr is: `+JSON.stringify(this.appSignalStore.training.editData().title, null, 2) );
      console.log('The current tr is: ',this.appSignalStore.training.editData.title() );
      this.trainingForm.setValue({
        title: this.appSignalStore.training.editData.title(), 
        secondaryTitle: this.appSignalStore.training.editData.secondaryTitle(), 
        shortDescription: this.appSignalStore.training.editData.shortDescription(), 
        longDescription: this.appSignalStore.training.editData.longDescription(), 
        rating: this.appSignalStore.training.editData.rating(), // Use the actual rating from the store
      });
    })
    

    
    // this.activatedRoute.queryParams.subscribe(params => {
    //   let id = params['id']
    //   console.log('-------- id = ' + id) // Print the parameter to the console.
    // })
    // this.store.dispatch(new TrainingActions.LoadTraining(this.routeId))
    // this.training$ = this.store.select(fromTrainingReducer.getSelectedTraining)
    // this.training$.subscribe((training: Training) => {
    //   // this.training = training
    //   this.training = training
    //   this.applyFormValues(this.rForm, training)
    //   this.setEvents(this.training.events)

    //   // this.setEvents([
    //   //   {
    //   //     // title: 'This is your',
    //   //     id: 1,
    //   //     start: '2001-01-09T09:00:00',
    //   //     color: '#f9c66a', // override!
    //   //   },
    //   //   {
    //   //     // title: 'Your meeting with john',
    //   //     id: 2,
    //   //     start: '2001-01-11T06:30:00',
    //   //     end: '2001-01-11T14:30:00',
    //   //     color: '#019efb',
    //   //   },
    //   // ])
    //   // this.setEvents([
    //   //   {
    //   //     id: 1,
    //   //     number: 3,
    //   //     start: '2001-01-11T08:30:00.000Z',
    //   //     end: '2001-01-11T14:30:00.000Z',
    //   //     version: 0,
    //   //   },
    //   //   {
    //   //     id: 2,
    //   //     number: 4,
    //   //     start: '2001-01-10T09:00:00.000Z',
    //   //     end: '2001-01-10T14:30:00.000Z',
    //   //     version: 0,
    //   //   },
    //   // ])
    // })
  }

  public hasError = (controlName: string, errorName: string) => {
    // console.log(
    //   'error ' + this.rForm.controls[controlName].hasError(errorName)
    // )
    return this.trainingForm.controls[controlName].hasError(errorName)
  }

  ngOnInit() {
    
    if( typeof $ === "undefined")
      return;
    this.trainingForm.get('rating')?.valueChanges.subscribe(
      rating => {
        console.log('rating changed to ', rating)
      })
    
    // this.setEvents([
    //   {
    //     // title: 'This is your',
    //     id: 1,
    //     start: '2001-01-09T09:00:00',
    //     color: '#f9c66a', // override!
    //   },
    //   {
    //     // title: 'Your meeting with john',
    //     id: 2,
    //     start: '2001-01-11T06:30:00',
    //     end: '2001-01-11T14:30:00',
    //     color: '#019efb',
    //   },
    // ])
    // $('#calendar').fullCalendar({
    //   defaultDate: '2001-01-07',
    //   defaultView: 'agendaWeek',
    //   allDaySlot: false,
    //   contentHeight: 'auto',
    //   // height: 560,
    //   header: {
    //     // left: 'prev,next today',
    //     // center: 'title',
    //     // right: 'month,agendaWeek,agendaDay',
    //     left: '',
    //     center: '',
    //     right: '',
    //   },
    //   // businessHours: [
    //   //   {
    //   //     dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
    //   //     start: '08:00',
    //   //     end: '12:00',
    //   //   },
    //   //   {
    //   //     dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
    //   //     start: '13:00',
    //   //     end: '18:00',
    //   //   },
    //   // ],
    //   columnHeaderHtml: function (date: { day: () => any }) {
    //     let day = date.day()
    //     if (day === 0) return 'Su'
    //     else if (day === 1) return 'Mo'
    //     else if (day === 2) return 'Tu'
    //     else if (day === 3) return 'We'
    //     else if (day === 4) return 'Th'
    //     else if (day === 5) return 'Fr'
    //     else if (day === 6) return 'Sa'
    //     else return ''
    //   },
    //   minTime: '08:00:00',
    //   maxTime: '18:00:00',
    //   // views: {
    //   //   dayGridMonth: {
    //   //     // name of view
    //   //     titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
    //   //     // other view-specific options here
    //   //   },
    //   // },
    //   navLinks: false,
    //   editable: true,
    //   eventLimit: true,
    //   events: [], // request to load current events
    //   eventRender: function (event: { tip: any }, element: { attr: (arg0: string, arg1: any) => void }) {
    //     element.attr('title', event.tip)
    //   },
    //   eventClick: this.eventClick.bind(this),
    // })
  }
  eventClick(calEvent: { id: any; color: string }, jsEvent: any, view: any) {
    console.log(
      'Event Start =' + require('util').inspect(calEvent.id, false, null)
    )
    // for (var i = 0; i < this.training.events.length; i++) {
    //   this.training.events[i].color = this.normalColor
    // }
    if (calEvent.color == this.normalColor) calEvent.color = this.markColor
    else if (calEvent.color == this.markColor) calEvent.color = this.normalColor
    console.log(
      'this.training=' + require('util').inspect(this.training, false, null)
    )
    $('#calendar').fullCalendar('removeEvents', calEvent.id)
    $('#calendar').fullCalendar('renderEvent', calEvent, 'stick')

    // this.store.dispatch(new TrainingActions.DeleteEvent(calEvent))
    // for (var i = 0; i < this.training.events.length; i++) {
    //   if (this.training.events[i].id == calEvent.id) {
    //     this.training.events[i].color = '#ff9efb'
    //     $('#calendar').fullCalendar('removeEvents', calEvent.id)
    //     $('#calendar').fullCalendar(
    //       'renderEvent',
    //       this.training.events[i],
    //       'stick'
    //     )
    //   }
    // }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name; // Added this line
    } else {
      this.selectedFile = null;
      this.selectedFileName = null; // Added this line
    }
  }

  async onSubmit() {
    console.log('submitted form=', this.trainingForm.value, this.trainingForm.invalid)
    this.isSubmitted = true;
    this.trainingForm.markAsTouched();
    if (!this.trainingForm.invalid) {
      await this.appSignalStore.saveTrainingAsync(this.trainingForm.value, this.selectedFile);
    }
  }
  isTitleDirtyTouchedOrSubmitted(field:string){
    return (this.trainingForm.get(field)?.dirty || this.trainingForm.get(field)?.touched || this.isSubmitted)
  }  
  isTitleValid(){
    this.titleError=''
    if( !this.isTitleDirtyTouchedOrSubmitted('title') ) return true
    if( this.trainingForm.get('title')?.hasError('required') ){
      this.titleError='required'
      console.log('title valid - required: ', false)
      return false
    }
    else if( this.trainingForm.get('title')?.hasError('maxlength') ){
      this.titleError='max length exceeded'
      console.log('title valid - maxlength: ', false)
      return false
    }
    // return this.trainingForm.get('title')?.invalid && (this.trainingForm.get('title')?.dirty || this.trainingForm.get('title')?.touched || this.isSubmitted)
    
    // console.log('title errors: ', this.trainingForm.get('title')?.errors?.['maxlength'])
    // console.log('title errors: ', this.trainingForm.get('title')?.hasError('maxlength'))
    // console.log('title valid: ', true)
    return true
  }

  validateRequiredTitle(){
    // return this.trainingForm.get('title')?.invalid && (this.trainingForm.get('title')?.dirty || this.trainingForm.get('title')?.touched || this.isSubmitted)
    
    // console.log('title errors: ', this.trainingForm.get('title')?.errors?.['maxlength'])
    // console.log('title errors: ', this.trainingForm.get('title')?.hasError('maxlength'))
    return this.trainingForm.get('title')?.hasError('required') 
  }
  validateMaxLengthTitle(){
    // return this.trainingForm.get('title')?.invalid && (this.trainingForm.get('title')?.dirty || this.trainingForm.get('title')?.touched || this.isSubmitted)
    
    // console.log('title errors: ', this.trainingForm.get('title')?.errors?.['maxlength'])
    // console.log('title errors: ', this.trainingForm.get('title')?.hasError('maxlength'))
    return this.trainingForm.get('title')?.hasError('maxlength') 
  }
  validateSecondaryTitle(){
    // return this.trainingForm.get('title')?.invalid && (this.trainingForm.get('title')?.dirty || this.trainingForm.get('title')?.touched || this.isSubmitted)
    return this.trainingForm.get('secondaryTitle')?.hasError('required') && (this.trainingForm.get('secondaryTitle')?.dirty || this.trainingForm.get('secondaryTitle')?.touched || this.isSubmitted)
  }
  validateShortDescription(){
    // return this.trainingForm.get('title')?.invalid && (this.trainingForm.get('title')?.dirty || this.trainingForm.get('title')?.touched || this.isSubmitted)
    return this.trainingForm.get('shortDescription')?.hasError('required') && (this.trainingForm.get('shortDescription')?.dirty || this.trainingForm.get('shortDescription')?.touched || this.isSubmitted)
  }
  validateLongDescription(){
    // return this.trainingForm.get('title')?.invalid && (this.trainingForm.get('title')?.dirty || this.trainingForm.get('title')?.touched || this.isSubmitted)
    return this.trainingForm.get('longDescription')?.hasError('required') && (this.trainingForm.get('longDescription')?.dirty || this.trainingForm.get('longDescription')?.touched || this.isSubmitted)
  }
  validateRole() {
    return this.trainingForm.get('roleId')?.invalid && 
           (this.trainingForm.get('roleId')?.dirty || 
            this.trainingForm.get('roleId')?.touched || 
            this.isSubmitted);
  }
  addEvent() {
    $('#calendar').fullCalendar('removeEvents', 0)
    var newEvent = {
      id: 0,
      title: 'NEW EVENT',
      start: '2001-01-07T08:00:00',
      end: '2001-01-07T10:00:00',
    }
    $('#calendar').fullCalendar('renderEvent', newEvent, 'stick')

    var events = $('#calendar').fullCalendar('clientEvents')
    console.log(
      'get events=' + require('util').inspect(events[0].start, false, null)
    )
    // for (var i = 0; i < events.length; i++) {
    //   if (events[i].id==0) {
    //   }
    // }
    // this.training.events = []
    // this.store.dispatch(
    //   // new TrainingActions.SaveTraining({ id: this.training.id, ...value }, this.file)
    //   new TrainingActions.SaveTraining(this.training, this.file)
    // )
  }
  removeEvents() {
    var events = $('#calendar').fullCalendar('clientEvents')
    for (var i = 0; i < events.length; i++) {
      if (events[i].color == this.markColor) {
        console.log(
          ' remove events.id=' +
            require('util').inspect(events[i].id, false, null)
        )
        $('#calendar').fullCalendar('removeEvents', events[i].id)
      }
      // else this.training.events[i].color = this.normalColor
    }

    // $('#calendar').fullCalendar('removeEvents', 0)
  }
  private applyFormValues(group: FormControl<any> & FormGroup<any>, formValues: { [x: string]: any }) {
    Object.keys(formValues).forEach((key) => {
      let formControl = <FormControl>group.controls[key]
      if (!formControl) return
      if (formControl instanceof FormGroup) {
        this.applyFormValues(formControl, formValues[key])
      } else {
        formControl.setValue(formValues[key])
      }
    })
  }
  onFilesAdded(event: { target: { files: any[] } }) {
    // this.file = event.target.files[0]
    // console.log(
    //   'event.target.files[0]=' +
    //     require('util').inspect(this.file.name, false, null)
    // )
  }

  setEvents(events: TrEvent[]) {
    // if (events instanceof Array) {
    // console.log(
    //   'Set it now. events=' + require('util').inspect(events, false, null)
    // )
    // setTimeout(() => {
    if (events)
      for (var i = 0; i < events.length; i++) {
        events[i].color = this.normalColor
      }

    $('#calendar').fullCalendar('removeEvents')
    $('#calendar').fullCalendar('addEventSource', events)
    $('#calendar').fullCalendar('rerenderEvents')
    // })
    // } //End if instance of
  }
}
