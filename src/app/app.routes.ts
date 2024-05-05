import { Routes } from '@angular/router';
import { HomeComponent } from '@app/tenantapp/public/home/home.component';
import { authGuard } from './auth.guard';
// import { TrainingappComponent } from './tenantapp/public/training/trainingapp/trainingapp.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    // {path:'trainings',component:TrainingappComponent}
    {path:'trainings',loadComponent:()=>import('./tenantapp/public/training/trainingapp/trainingapp.component').then(m=>m.TrainingappComponent), canActivate: [authGuard] },
    { path: '404', component:HomeComponent },
    { path: '**', component:HomeComponent }
];
