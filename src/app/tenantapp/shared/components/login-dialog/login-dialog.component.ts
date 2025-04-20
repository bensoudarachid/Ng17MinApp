import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@module/Material.Module';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  template: `
    <h2 mat-dialog-title>Please log in</h2>
    <mat-dialog-content>
      <div class="login-form">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Email</mat-label>
          <input matInput type="email" [(ngModel)]="email" placeholder="Your email">
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Password</mat-label>
          <input matInput [type]="hidePassword ? 'password' : 'text'" [(ngModel)]="password" placeholder="Your password">
          <mat-icon matPrefix>lock</mat-icon>
          <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword">
            <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" (click)="login()">
        Log in
        <mat-icon>login</mat-icon>
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .login-form {
      min-width: 350px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class LoginDialogComponent {
  email: string = '';
  password: string = '';
  hidePassword = true;
  dialogRef = inject(MatDialogRef<LoginDialogComponent>);

  login() {
    if (this.email && this.password) {
      this.dialogRef.close({ email: this.email, password: this.password });
    }
  }
}
