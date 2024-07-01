import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingappComponent } from '../../private/training/trainingapp/trainingapp.component';
import { TrainingappPubComponent } from '../../public/training/trainingapp/trainingapp.component';
import { AppImageComponent } from '@src/app/shared/components/app-image/app-image.component';
import { TrainingItemComponent } from './training-item/training-item.component';
import { MaterialModule } from '@src/_module/Material.Module';
import { RouterLink, RouterModule } from '@angular/router';

@NgModule({
  imports: [
     CommonModule,
     TrainingRoutingModule,
     MaterialModule, CommonModule,
     RouterLink,RouterModule,
  ]
})
export class TrainingModule {}

