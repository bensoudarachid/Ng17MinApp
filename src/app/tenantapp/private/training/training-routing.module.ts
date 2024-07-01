import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from "@src/app/auth.guard";
import { TrainingappPubComponent } from '@app/tenantapp/public/training/trainingapp/trainingapp.component';
import { TrainingappComponent } from "@app/tenantapp/private/training/trainingapp/trainingapp.component";
import { TrainingAdminDetailsComponent } from "@app/tenantapp/private/training/training-admin-details/training-admin-details.component";


const TRAININGS_ROUTES: Routes = [
    //  {
    //       path:'trainings',
    //       // loadComponent:()=>import('./tenantapp/*/*.component').then(m=>m.TrainingappComponent),
    //       children: [
              {   path:'list',
                  // loadComponent:()=>import('./tenantapp/public/training/trainingapp/trainingapp.component').then(m=>m.TrainingappPubComponent), 
                  component:TrainingappPubComponent
              },
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

    //       ]
    //   },
]

// const routes: Routes = [
//      {
//           path:'trainings',
//           // loadComponent:()=>import('./tenantapp/*/*.component').then(m=>m.TrainingappComponent),
//           children: [
//               {   path:'list',
//                   // loadComponent:()=>import('./tenantapp/public/training/trainingapp/trainingapp.component').then(m=>m.TrainingappPubComponent), 
//                   component:TrainingappPubComponent
//               },
//               {
//                   path:'',
//                   // loadComponent:()=>import('./tenantapp/private/training/trainingapp/trainingapp.component').then(m=>m.TrainingappComponent), 
//                   component:TrainingappComponent,
//                   // children: [
//                   //     {   path:'training/:id',component:TrainingAdminDetailsComponent}
//                   // ],
//                   canActivate: [authGuard] 
//               },
//               {
//                   path:':id',
//                   // loadComponent:()=>import('./tenantapp/private/training/training-admin-details/training-admin-details.component').then(m=>m.TrainingAdminDetailsComponent), 
//                   component:TrainingAdminDetailsComponent,
//                   canActivate: [authGuard] 
//               }

//           ]
//       },
// ];

@NgModule({
  imports: [RouterModule.forChild(TRAININGS_ROUTES)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }

