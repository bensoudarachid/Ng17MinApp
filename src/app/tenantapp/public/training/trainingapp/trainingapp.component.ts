import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '@app/tenantapp/services/trainings/trainings.service';
import { Training } from '@model/Training';
import { TrainingItemComponent } from '../training-item/training-item.component';
import { MaterialModule } from '@src/_module/Material.Module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadTraining } from '@src/app/_store/Training/Training.Actions';
import { getTrainingList } from '@src/app/_store/Training/Training.Selector';
import { AppImageComponent } from '@src/app/shared/components/app-image/app-image.component';

@Component({
  selector: 'app-trainingapp',
  standalone: true,
  imports: [MaterialModule, CommonModule, TrainingItemComponent,AppImageComponent],
  templateUrl: './trainingapp.component.html',
  styleUrl: './trainingapp.component.scss'
})
export class TrainingappComponent implements OnInit {
  // constructor(private trainingsService: TrainingsService ) {}
  constructor(private store: Store) { }
  trainings!: Training[];
  ngOnInit(): void {
    this.loadTrainings();
  }
  loadTrainings() {
    console.log('training app component. load trainings now by dispatching actions... to do later. service call is here')
    this.store.dispatch(loadTraining())
    this.store.select(getTrainingList).subscribe(item => {
      // console.log('this.trainingList from service = '+JSON.stringify(item, null, 2))
      this.trainings = item;
    });
    // console.log('this.trainingList from model = '+JSON.stringify(this.trainingList, null, 2))
    console.log('this.trainingList from model = ---')
    console.log(this.trainings) // this puts also object structure out
  }
}
