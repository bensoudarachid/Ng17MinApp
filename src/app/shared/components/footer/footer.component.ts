import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSignalStore } from '@src/app/_store/Signal.Store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  appSignalStore = inject(AppSignalStore);

  // Directly expose the signal for the template
  footerMessage = this.appSignalStore.ui.footerMessage;
}
