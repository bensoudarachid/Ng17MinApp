import { RouterLink } from '@angular/router';
import { MaterialModule } from '@module/Material.Module';
import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,MaterialModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  @Output()
  loginEvent = new EventEmitter<string>()

  startLogin() {
    console.log('startLogin')
    this.loginEvent.emit('startLogin')
  }
}
