import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, provideRouter } from '@angular/router';
import { MaterialModule } from '@src/_module/Material.Module';
import { AppImageComponent } from '@src/app/shared/components/app-image/app-image.component';

@Component({
  selector: 'app-training-item',
  standalone: true,
  
  imports: [RouterLink,RouterModule,MaterialModule,CommonModule,AppImageComponent],
  // imports: [MaterialModule,CommonModule],
  templateUrl: './training-item.component.html',
  styleUrl: './training-item.component.scss'
})
export class TrainingItemComponent {
  @Input() trainingInput: any
  @Input() api: any
  trainingid:string | undefined
  // imgid:string
  router = inject(Router);

  constructor() {}

  ngOnInit() {
    
    // trainingInput.imgid
    this.trainingid=this.trainingInput.id
    // console.log('Image id = '+this.trainingInput.get('id'))
  }

}
