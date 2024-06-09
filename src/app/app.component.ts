import { RouterOutlet } from '@angular/router';
import { NavComponent } from './tenantapp/shared/components/nav/nav.component';

//import { ApiConnection } from '@tenantapp/services/api-connection.service'
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core'
// import { Store } from '@ngrx/store'
// import { Observable } from 'rxjs'
// import { AppState } from './tenantapp/store/appstate'
// import * as LoginActions from './tenantapp/store/actions/auth.actions'
// import * as appActions from './tenantapp/store/actions/app.actions'
// import * as authActions from './tenantapp/store/actions/auth.actions'

import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ModalModule, WavesModule, InputsModule } from 'angular-bootstrap-md'

import { ApiConnection } from '@src/app/shared/services/api-connection.service'
import { Store } from '@ngrx/store'
//import { Observable } from "rxjs/observable";
import { Observable } from 'rxjs'
import { loginRequest, loginSuccess, refreshRequest } from '@src/app/_store/Auth/Auth.Actions';
import { getIsAuthenticated } from '@src/app/_store/Auth/Auth.Selector';
import { CookieService } from 'ngx-cookie-service';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
import { patchState } from '@ngrx/signals';
// import { CookieService } from 'ngx-cookie-service'

// import { trainingState } from "@src/app/_store/Training/Training.State"
// import * as LoginActions from './tenantapp/store/actions/auth.actions'
// import * as appActions from './tenantapp/store/actions/app.actions'
// import * as authActions from './tenantapp/store/actions/auth.actions'
declare var $: any


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Ng17MinApp';
  appSignalStore = inject(AppSignalStore)

  password: string = ""
  email: string = ""
  // appError: Observable<string>
  appErrorBuffer: string = ""
  isTenantApp = ApiConnection.isTenantApp
  // @ViewChild('loginform', { static: false }) loginForm:ElementRef<any>
  @ViewChild('loginform') loginForm:any
  @ViewChild('errordlg', { static: false }) errorDlg:any

  constructor(
    private store: Store,
    private cookiesService: CookieService
  ) {
    // this.appError = this.store.select(state => state.appReducer.get('errormessage'))
    // this.appError = this.store.select((state) => state.appReducer.errormessage)
    // this.appError.subscribe((data) => {
    //   if (data != undefined) {
    //     this.appErrorBuffer = data
    //     this.errorDlg.show()
    //   }
    //   this.store.dispatch(new appActions.AppError(undefined))
    // })
  }

  ngAfterViewInit(): void {
    console.log('Page loaded ')
    // if( this.appError )
    //   this.errorDlg.show()
  }

  ngOnInit(): void {
    if( typeof $ === "undefined")
      return;
    $(window).scroll( () => {
      let wScroll = $(this).scrollTop()
      $('.imgparallax').css({
        transform:
          'translate(0px,' +
          (15 + wScroll * -0.015) +
          '%) scale(' +
          (1 + wScroll / 30000) +
          ')',
      })
    })
    // this.store.select(getIsAuthenticated).subscribe(item => {
    //   console.log('this.getIsAuthenticated  = '+JSON.stringify(item, null, 2))
    // });
    // this.cookiesService.set('jwt', userAccessData.access_token,expireDate,'/',undefined,true)
    // this.cookiesService.set('refreshtoken', userAccessData.refresh_token,expireDate,'/',undefined,true)
    let jwtToken = this.cookiesService.get('jwt')
    console.log('app component ngOnInit jwt token:' + jwtToken)

    let authority = this.cookiesService.get('authority')
    let refreshToken = this.cookiesService.get('refreshtoken')
    let expirationDate =
      this.cookiesService.get('expirationdate') != undefined
        ? Number(this.cookiesService.get('expirationdate'))
        : undefined
    console.log('Actual date: ' + new Date())
    // console.log('Actual date: '+new Date().getTime())
    if (expirationDate == undefined || refreshToken == undefined) return
    console.log('Expiration date: ' + new Date(expirationDate))
    // console.log('Expiration date: '+new Date(expirationDate).getTime())
    if (new Date(expirationDate).getTime() > new Date().getTime()) {
      console.log('Dispatch login success.')
      // this.store.dispatch(refreshRequest())
      // this.store.dispatch(loginSuccess({'authority': authority}))
      patchState(this.appSignalStore, (store)=>( { auth:{...store.auth,  isAuthenticated:true, isFetching: false  }}))
      this.appSignalStore.refreshAuthToken()
    } 
    // else {
    //   console.log('Dispatch refresh token.')
    //   // console.log(this.store.dispatch(refreshRequest()))
    // }
    // console.log('appSignalStore. call loadAllTrainings now.')
    // const value = this.appSignalStore.loadAllTrainingsAsync();
    // console.log('value : '+value)
    // console.log('appcomponent. call loadAllTrainings now.')
    // this.appSignalStore.loadAllTrainingsAsync();
    // console.log('appcomponent. Call appSignalStore.loadAllTrainings: '+JSON.stringify(value, null, 2))

    // this.appSignalStore.training.list()

  }
  startLogin() {
    console.log('Start login'+this.loginForm)
    console.log(this.loginForm)
    // this.errorDlg.show()
    // this.loginForm.nativeElement.hidden=false;
    this.loginForm.show()
  }
  // showError(){
  //   if( this.appError )
  //     this.errorDlg.show()
  // }
  async signIn() {
    console.log('Sign in:'+ this.email +', '+ this.password)
    // this.store.dispatch(loginRequest({email: this.email,password: this.password}))
    await this.appSignalStore.login(this.email, this.password)
    this.appSignalStore.refreshAuthToken()
    
    // this.store.dispatch(
    //   // new LoginActions.LoginRequest(this.email, this.password)
    // )
  }
  removeErrorMessage() {
    console.log('remove Error Message')
    // this.store.dispatch(new appActions.AppError(undefined))
  }

  
}

// loadTrainings() {
//   console.log('training app component. load trainings now by dispatching actions... to do later. service call is here')
//   this.store.dispatch(loadTraining())
//   this.store.select(getTrainingList).subscribe(item => {
//     // console.log('this.trainingList from service = '+JSON.stringify(item, null, 2))
//     this.trainings = item;
//   });
//   // console.log('this.trainingList from model = '+JSON.stringify(this.trainingList, null, 2))
//   console.log('this.trainingList from model = ---')
//   console.log(this.trainings) // this puts also object structure out
// }
// }
// getIsAuthenticated

