import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '@src/_module/Material.Module';
import { AppImageComponent } from '@src/app/shared/components/app-image/app-image.component';

@Component({
  selector: 'app-training-item',
  standalone: true,
  imports: [MaterialModule,CommonModule,AppImageComponent],
  // imports: [MaterialModule,CommonModule],
  templateUrl: './training-item.component.html',
  styleUrl: './training-item.component.scss'
})
export class TrainingItemComponent {
  @Input() trainingInput:any
  @Input() api: any
  trainingid:string | undefined
  // imgid:string
  constructor() { }

  ngOnInit() {
    // trainingInput.imgid
    this.trainingid=this.trainingInput.id
    // console.log('Image id = '+this.trainingInput.get('id'))
  }

}
