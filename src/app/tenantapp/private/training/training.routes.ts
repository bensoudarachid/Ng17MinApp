import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingappComponent } from './trainingapp/trainingapp.component';
import { TrainingappPubComponent } from '../../public/training/trainingapp/trainingapp.component';
import { AppImageComponent } from '@src/app/shared/components/app-image/app-image.component';
import { TrainingItemComponent } from './training-item/training-item.component';
import { MaterialModule } from '@src/_module/Material.Module';
import { RouterLink, RouterModule } from '@angular/router';

import { Routes } from "@angular/router";
import { authGuard } from '@src/app/auth.guard';
import { TrainingAdminDetailsComponent } from './training-admin-details/training-admin-details.component';

export const TRAINING_ROUTES: Routes = [

        // {   path:'list',
        //     // loadComponent:()=>import('./tenantapp/public/training/trainingapp/trainingapp.component').then(m=>m.TrainingappPubComponent), 
        //     component:TrainingappPubComponent,
        //     canActivate: [authGuard] 
        // },
        {
            path:'',
            // loadComponent:()=>import('./tenantapp/private/training/trainingapp/trainingapp.component').then(m=>m.TrainingappComponent), 
            component:TrainingappComponent,
            // children: [
            //     {   path:'training/:id',component:TrainingAdminDetailsComponent}
            // ],
            canActivate: [authGuard] 
        },
        {
            path:':id',
            // loadComponent:()=>import('./tenantapp/private/training/training-admin-details/training-admin-details.component').then(m=>m.TrainingAdminDetailsComponent), 
            component:TrainingAdminDetailsComponent,
            canActivate: [authGuard] 
        }

]


