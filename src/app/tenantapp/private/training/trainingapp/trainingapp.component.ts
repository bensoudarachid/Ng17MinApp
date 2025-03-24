import { Component, OnInit, inject } from '@angular/core';
import { TrainingsService } from '@app/tenantapp/services/trainings/trainings.service';
import { Training } from '@model/Training';
import { TrainingItemComponent } from '../training-item/training-item.component';
import { MaterialModule } from '@src/_module/Material.Module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppImageComponent } from '@src/app/shared/components/app-image/app-image.component';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
declare var $: any

@Component({
  selector: 'app-trainingapp',
  standalone: true,
  imports: [MaterialModule, CommonModule, TrainingItemComponent,AppImageComponent],
  templateUrl: './trainingapp.component.html',
  styleUrl: './trainingapp.component.scss'
})
export class TrainingappComponent implements OnInit {
  // constructor(private trainingsService: TrainingsService ) {}
  // trainingsService = inject(TrainingsService)
  appSignalStore = inject(AppSignalStore)
  private router = inject(Router);
  constructor(private store: Store) { }
  trainings: Training[]=[];
  ngOnInit(): void {
    if( typeof $ === "undefined")
      return;
    this.loadTrainings();
  }
  ngAfterViewInit(): void {
    // if( this.appError )
    //   this.errorDlg.show()
  }
  loadTrainings() {
    console.log('trainingapp. call loadAllTrainings now.')
    this.appSignalStore.loadAllTrainingsAsync();
    // console.log('trainingapp. Call appSignalStore.loadAllTrainings: '+JSON.stringify(value, null, 2))
    this.trainings=this.appSignalStore.training.list()
    // console.log('trainingapp. loaded trainings: '+JSON.stringify(this.trainings, null, 2))
    // console.log('training app component. load trainings now by dispatching actions... to do later. service call is here')
    // this.store.dispatch(loadTraining())
    // this.store.select(getTrainingList).subscribe(item => {
    //   // console.log('this.trainingList from service = '+JSON.stringify(item, null, 2))
    //   this.trainings = item;
    // });
    // // console.log('this.trainingList from model = '+JSON.stringify(this.trainingList, null, 2))
    // console.log('this.trainingList from model = ---')
    // console.log(this.trainings) // this puts also object structure out
  }

  async onNewTraining() {
    await this.appSignalStore.createNewTrainingAsync();
    // this.router.navigate(['/private/training/edit/-1']);
    this.router.navigate(['/trainings/-1']);
    
  }
}
