import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './tenantapp/shared/components/nav/nav.component';
import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID, Inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule, isPlatformBrowser } from '@angular/common'
import { ApiConnection } from '@src/app/shared/services/api-connection.service'
import { Store } from '@ngrx/store'
import { CookieService } from 'ngx-cookie-service';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './tenantapp/shared/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Ng17MinApp';
  appSignalStore = inject(AppSignalStore)
  router = inject(Router);
  dialog = inject(MatDialog);

  appErrorBuffer: string = ""
  isTenantApp = ApiConnection.isTenantApp
  private isBrowser: boolean;

  constructor(
    private store: Store,
    private cookiesService: CookieService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
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
    if (jwtToken) {
      console.log('authority:' + authority);
    }
  }

  startLogin() {
    if (!this.isBrowser) return;
    
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.appSignalStore.login(result.email, result.password);
        this.appSignalStore.refreshAuthToken();
        this.router.navigate(['/']);
      }
    });
  }

  removeErrorMessage() {
    console.log('remove Error Message');
  }
}
