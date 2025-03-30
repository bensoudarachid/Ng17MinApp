import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from './tenantapp/shared/components/nav/nav.component';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject, PLATFORM_ID, Inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule, isPlatformBrowser } from '@angular/common'
import { ApiConnection } from '@src/app/shared/services/api-connection.service'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { loginRequest, loginSuccess, refreshRequest } from '@src/app/_store/Auth/Auth.Actions';
import { getIsAuthenticated } from '@src/app/_store/Auth/Auth.Selector';
import { CookieService } from 'ngx-cookie-service';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
import { patchState } from '@ngrx/signals';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet,NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Ng17MinApp';
  appSignalStore = inject(AppSignalStore)
  router = inject(Router);

  password: string = ""
  email: string = ""
  appErrorBuffer: string = ""
  isTenantApp = ApiConnection.isTenantApp
  @ViewChild('loginform') loginForm!: ElementRef;
  @ViewChild('errordlg') errorDlg: any;
  private loginModal: any;
  private isBrowser: boolean;

  constructor(
    private store: Store,
    private cookiesService: CookieService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      console.log('Page loaded');
      if (this.loginForm?.nativeElement) {
        this.loginModal = new (window as any).bootstrap.Modal(this.loginForm.nativeElement);
      }
    }
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    if (typeof (window as any).$ !== "undefined") {
      (window as any).$(window).scroll(() => {
        let wScroll = (window as any).$(window).scrollTop();
        (window as any).$('.imgparallax').css({
          transform:
            'translate(0px,' +
            (15 + wScroll * -0.015) +
            '%) scale(' +
            (1 + wScroll / 30000) +
            ')',
        });
      });
    }

    let jwtToken = this.cookiesService.get('jwt');
    console.log('app component ngOnInit jwt token:' + jwtToken);

    let authority = this.cookiesService.get('authority');
    let refreshToken = this.cookiesService.get('refreshtoken');
    let expirationDate =
      this.cookiesService.get('expirationdate') != undefined
        ? Number(this.cookiesService.get('expirationdate'))
        : undefined;

    if (expirationDate == undefined || refreshToken == undefined) return;
    
    if (new Date(expirationDate).getTime() > new Date().getTime()) {
      patchState(this.appSignalStore, (store)=>( { auth:{...store.auth,  isAuthenticated:true, isFetching: false  }}));
      this.appSignalStore.refreshAuthToken();
    } 
    this.appSignalStore.setFooterMessage('Welcome to the Training App!', 3000); 
  }

  startLogin() {
    if (this.isBrowser && this.loginModal) {
      this.loginModal.show();
    }
  }

  async signIn() {
    await this.appSignalStore.login(this.email, this.password);
    this.appSignalStore.refreshAuthToken();
    if (this.isBrowser && this.loginModal) {
      this.loginModal.hide();
    }
    this.router.navigate(['/']);
  }

  removeErrorMessage() {
    console.log('remove Error Message');
  }
}
