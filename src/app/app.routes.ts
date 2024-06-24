import { Routes } from '@angular/router';
import { HomeComponent } from '@app/tenantapp/public/home/home.component';
import { authGuard } from './auth.guard';
import { TrainingappComponent } from '@app/tenantapp/private/training/trainingapp/trainingapp.component';
import { TrainingItemComponent } from '@app/tenantapp/private/training/training-item/training-item.component';
import { TrainingAdminDetailsComponent } from '@app/tenantapp/private/training/training-admin-details/training-admin-details.component';
import { TrainingappPubComponent } from '@app/tenantapp/public/training/trainingapp/trainingapp.component';

// export const routes: Routes = [
//     {path:'',component:HomeComponent},
//     // {path:'trainings',component:TrainingappComponent}
//     {path:'training/trainings-pub',loadComponent:()=>import('./tenantapp/public/training/trainingapp/trainingapp.component').then(m=>m.TrainingappComponent), canActivate: [authGuard] },
//     {path:'training/trainings',loadComponent:()=>import('./tenantapp/private/training/trainingapp/trainingapp.component').then(m=>m.TrainingappComponent), canActivate: [authGuard] },
//     // { path: '404', component:HomeComponent },
//     // { path: '**', component:HomeComponent }
// ];

export const routes: Routes = [
    {
        path:'',
        // component:HomeComponent,
        children: [
            {   path:'',component:HomeComponent},
            {
                path:'trainings/list',
                // loadComponent:()=>import('./tenantapp/private/training/training-admin-details/training-admin-details.component').then(m=>m.TrainingAdminDetailsComponent), 
                component:TrainingappPubComponent,
                // canActivate: [authGuard] 
            },
            {
                path:'trainings',
                // loadChildren: () => import('@src/app/tenantapp/private/training/training-routing.module').then(m => m.TrainingRoutingModule)
                loadChildren: () => import('@src/app/tenantapp/private/training/training.routes').then(m => m.TRAINING_ROUTES),
                // loadChildren: () => import('@src/app/tenantapp/private/training/training.module').then(m => m.TrainingModule)
                // loadComponent:()=>import('./tenantapp/*/*.component').then(m=>m.TrainingappComponent),
                // children: [
                //     {   path:'list',
                //         // loadComponent:()=>import('./tenantapp/public/training/trainingapp/trainingapp.component').then(m=>m.TrainingappPubComponent), 
                //         component:TrainingappPubComponent,
                //         canActivate: [authGuard] 
                //     },
                    // {
                    //     path:'',
                    //     // loadComponent:()=>import('./tenantapp/private/training/trainingapp/trainingapp.component').then(m=>m.TrainingappComponent), 
                    //     component:TrainingappComponent,
                    //     // children: [
                    //     //     {   path:'training/:id',component:TrainingAdminDetailsComponent}
                    //     // ],
                    //     canActivate: [authGuard] 
                    // },
                    // {
                    //     path:':id',
                    //     // loadComponent:()=>import('./tenantapp/private/training/training-admin-details/training-admin-details.component').then(m=>m.TrainingAdminDetailsComponent), 
                    //     component:TrainingAdminDetailsComponent,
                    //     canActivate: [authGuard] 
                    // }
                // ]
            },
]
    },
    // {path:'trainings',component:TrainingappComponent}
    // {path:'training/trainings-pub',loadComponent:()=>import('./tenantapp/public/training/trainingapp/trainingapp.component').then(m=>m.TrainingappComponent), canActivate: [authGuard] },
    // {path:'training/trainings',loadComponent:()=>import('./tenantapp/private/training/trainingapp/trainingapp.component').then(m=>m.TrainingappComponent), canActivate: [authGuard] },
    // { path: '404', component:HomeComponent },
    // { path: '**', component:HomeComponent }
];
