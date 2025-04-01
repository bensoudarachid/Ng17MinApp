import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from '@src/_module/Material.Module';
import { AppImageComponent } from '@src/app/shared/components/app-image/app-image.component';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-training-item',
  standalone: true,
  imports: [RouterLink,RouterModule,MaterialModule,CommonModule,AppImageComponent],
  templateUrl: './training-item.component.html',
  styleUrl: './training-item.component.scss'
})
export class TrainingItemComponent {
  @Input() trainingInput: any;
  @Input() api: any;
  @Output() deleteTraining = new EventEmitter<string>();
  trainingid: string | undefined;
  router = inject(Router);
  appSignalStore = inject(AppSignalStore);
  dialog = inject(MatDialog);
  
  constructor() {}

  ngOnInit() {
    this.trainingid = this.trainingInput.id;
  }

  onDelete(event: Event) {
    event.stopPropagation();
    if (this.trainingInput.id) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Confirmed delete training = ' + this.trainingInput.id);
          this.appSignalStore.deleteTrainingAsync(this.trainingInput.id);
          this.appSignalStore.setFooterMessage('Training deleted successfully', 3000);
        }
      });
    }
  }
}
