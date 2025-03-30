import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '@module/Material.Module';
import { Component, OnInit, Output, EventEmitter, inject, PLATFORM_ID, Inject } from '@angular/core'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getIsAuthenticated } from '@src/app/_store/Auth/Auth.Selector';
import { CommonModule, NgIf, isPlatformBrowser } from '@angular/common'
import { AppSignalStore } from '@src/app/_store/Signal.Store';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,MaterialModule,NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  @Output()
  loginEvent = new EventEmitter<string>();
  isAuthenticated: boolean = false;
  appSignalStore = inject(AppSignalStore);
  router = inject(Router);
  private isBrowser: boolean;

  constructor(
    private store: Store,
    private cookiesService: CookieService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  startLogin() {
    if (this.isBrowser) {
      console.log('startLogin');
      this.loginEvent.emit('startLogin');
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.store.select(getIsAuthenticated).subscribe(item => {
        console.log('Nav. this.getIsAuthenticated  = ' + JSON.stringify(item, null, 2));
        this.isAuthenticated = item;
      });
    }
  }

  signOut() {
    if (this.isBrowser) {
      console.log('Sign out');
      this.appSignalStore.logout();
      this.router.navigate(['']);
    }
  }
}
