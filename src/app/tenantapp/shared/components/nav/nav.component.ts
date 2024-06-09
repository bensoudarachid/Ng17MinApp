import { RouterLink } from '@angular/router';
import { MaterialModule } from '@module/Material.Module';
import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getIsAuthenticated } from '@src/app/_store/Auth/Auth.Selector';
import { NgIf } from '@angular/common'
import { logoutRequest } from '@src/app/_store/Auth/Auth.Actions';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,MaterialModule,NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  @Output()
  loginEvent = new EventEmitter<string>()
  // isAuthenticated$ = new Observable<boolean>
  isAuthenticated: boolean = false
  appSignalStore = inject(AppSignalStore)

  constructor(private store: Store, private cookiesService: CookieService ) {}

  startLogin() {
    console.log('startLogin')
    this.loginEvent.emit('startLogin')
  }
  ngOnInit(): void {
    this.store.select(getIsAuthenticated).subscribe(item => {
      console.log('Nav. this.getIsAuthenticated  = '+JSON.stringify(item, null, 2))
      this.isAuthenticated=item
    });
  }

  signOut() {
    console.log('Sign out')
    // this.store.dispatch(logoutRequest())
    // let jwtToken = this.cookiesService.get('jwt')
    // console.log('before delete:' + jwtToken)
    this.appSignalStore.logout()
    
    // this.store.dispatch(
    //   // new LoginActions.LoginRequest(this.email, this.password)
    // )
  }

}
