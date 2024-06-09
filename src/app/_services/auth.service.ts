import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { ApiConnection } from '@app/shared/services/api-connection.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
import { patchState } from '@ngrx/signals';
import { EMPTY } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // appSignalStore = inject(AppSignalStore)
  // private appSignalStore: AppSignalStore;
  // appSignalStore = inject(AppSignalStore)
  constructor(private http: HttpClient, private cookieService: CookieService )  { }
  
  // private refreshTokenTimeout?: NodeJS.Timeout;
  
  // setAppSignalStore(appSignalStore:any) {
  //   this.appSignalStore=appSignalStore
  // }
  login(email: string, password: string) {
    console.log('Auth service login noW')
    // let params = new HttpParams()
    // params =params.set('grant_type','password')
    const httpOptions = {
      // params,
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa('clientapp:123456'),
      }),
    }

    let body = new HttpParams()
    body = body.set('username', email)
    body = body.set('password', password)
    body = body.set('grant_type', 'password')

    return this.http.post(
      ApiConnection.API_ENDPOINT + '/oauth/token',
      body.toString(),
      httpOptions
    )
  }

  refreshTokenTest(refreshToken: string): any {
    const httpOptions = {
      // params,
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa('clientapp:123456'),
      }),
    }
    let body = new HttpParams()
    body = body.set('refresh_token', refreshToken)
    // body = body.set('username', 'admin')
    // body = body.set('client_id', 'clientapp')
    // body = body.set('client_secret', '123456')
    body = body.set('grant_type', 'refresh_token')
    console.log('Auth service get refresh token with http.post. use Refresh Token: ' + refreshToken)
    return this.http.post(
      ApiConnection.API_ENDPOINT + '/oauth/token',
      body.toString(),
      httpOptions
    ).pipe(
      catchError(error => {
        console.error('Error while refreshing token: ', error);
        return throwError(()=> new Error('Error while refreshing token:. Something went wrong; please try again later.'));
      })
    );
  }

  logout() {
    let jwtToken = this.cookieService.get('jwt')
    const httpOptions = {
      // params,
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: 'Bearer ' + jwtToken,
      }),
    }

    let body = new HttpParams()
    // body = body.set('username', email)
    // body = body.set('password', password);
    // body = body.set('grant_type', 'password')

    return this.http.post(
      ApiConnection.API_ENDPOINT + '/oauth/logout',
      body.toString(),
      httpOptions
    )
  }


  // logoutObservable(jwtToken: string) {
  //   const httpOptions = {
  //     // params,
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Accept: 'application/json',
  //       Authorization: 'Bearer ' + jwtToken,
  //     }),
  //   }
  //   let body = new HttpParams()
  //   // body = body.set('username', email)
  //   // body = body.set('password', password);
  //   // body = body.set('grant_type', 'password')

  //   return this.http.post(
  //     ApiConnection.API_ENDPOINT + '/oauth/logout',
  //     body.toString(),
  //     httpOptions
  //   ).pipe(
  //     catchError(error => {
  //       console.error('Error while logout::', error);
  //       return throwError(()=> new Error('Error while logout. Something went wrong; please try again later.'));
  //     })
  //   );
  // }
  loginObservable(email: string, password: string) : Observable<any> {
    console.log('Auth service login noW. Pass: '+password)
    // let params = new HttpParams()
    // params =params.set('grant_type','password')
    const httpOptions = {
      // params,
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa('clientapp:123456'),
      }),
    }

    let body = new HttpParams()
    body = body.set('username', email)
    body = body.set('password', password)
    body = body.set('grant_type', 'password')
    
    return this.http.post(
      ApiConnection.API_ENDPOINT + '/oauth/token',
      // ApiConnection.API_ENDPOINT + '/login',
      body.toString(),
      httpOptions
    ).pipe(
      catchError(error => {
        console.error('Error while login: ', error);
        return throwError(()=> new Error('Error while login:. Something went wrong; please try again later.'));
      })
    );
  }
  refreshTokenObservableTest() {
    const httpOptions = {
      // params,
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: 'Bearer ' + 'jwtToken',
      }),
    }

    let body = new HttpParams()
    // body = body.set('username', email)
    // body = body.set('password', password);
    // body = body.set('grant_type', 'password')

    return this.http.post(
      ApiConnection.API_ENDPOINT + '/oauth/logout',
      body.toString(),
      httpOptions
    )
  }

  getTrainings3(): Observable<any> {
    console.log('TrainingsService. load trainings 3')
    return this.http.get<any>(ApiConnection.API_ENDPOINT+'/api/trainings/123').pipe(
      catchError(error => {
        console.error('Error fetching trainigs JSON data:', error);
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    );
  }

  refreshTokenObservable(){
    console.log('authservice. Try Refresh auth token!')
    let refreshToken = this.cookieService.get('refreshtoken')
    let expirationDate =
      this.cookieService.get('expirationdate') != undefined
        ? Number(this.cookieService.get('expirationdate'))
        : 0
    console.log('Actual date: '+new Date().getTime())
    console.log('expirationDate: '+expirationDate)
    console.log('refreshToken: '+refreshToken)
    if( expirationDate==0 || refreshToken==undefined){
        console.log('No refresh token because there are no cookies')
        return EMPTY
    }        
    // if( expirationDate!=0 && new Date(expirationDate).getTime()>new Date().getTime()){
    //     console.log('refreshing token not needed. expiration date still valid')
    //     return EMPTY
    // }        
    if (
      expirationDate == 0 ||
      refreshToken == undefined ||
      refreshToken == '' 
      // ||
      // new Date(expirationDate).getTime() > new Date().getTime()
    ){
      console.log('Refresh auth token is not taking place. expirationDate '+expirationDate+ 'refreshToken '+refreshToken )
      return EMPTY
    }
    console.log('Refresh auth token! Expiration date: ' + new Date(expirationDate))
    console.log('Refresh auth token! Refresh token: ' + refreshToken)

    let jwtToken = this.cookieService.get('jwt')
    console.log('before delete. jwtToken:' + jwtToken)
    let refreshtoken = this.cookieService.get('refreshtoken')
    console.log('Auth refresh auth token request with refresh token: '+refreshtoken)
    // this.cookieService.deleteAll()
    if (
      refreshToken == 'null' ||
      refreshToken == 'undefined' ||
      refreshToken == undefined ||
      refreshToken == ''
    ) {
      console.log('Refresh auth token! return undefined')
      return EMPTY
    } else {
      console.log('Refresh auth token! call authService')
      const httpOptions = {
        // params,
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa('clientapp:123456'),
        }),
      }
      let body = new HttpParams()
      body = body.set('refresh_token', refreshToken)
      body = body.set('grant_type', 'refresh_token')
      console.log('Auth service Post: ' + refreshToken)
      return this.http.post(
        ApiConnection.API_ENDPOINT + '/oauth/token',
        body.toString(),
        httpOptions
      ).pipe(
        // map((userAccessData) =>
        //   this.processAccessDataResponse(userAccessData)
        //   // patchState(appSignalStore, (store)=>( { auth:{...store.auth,  isAuthenticated:true, isFetching: false  }}))
        // ),
        catchError(error => {
          // this.store.dispatch(
          //   new authActions.LoginFailure(
          //     'Could not authenticate. Please login again'
          //   )
          // )
          let jwtToken = this.cookieService.get('jwt')
          console.log('auth service. error retrieving jwtToken. From cookie service:' + jwtToken)
          this.resetAuthData()
          // if (jwtToken!=undefined && jwtToken!= '') {
          //   this.cookieService.set('jwt', '', undefined, '/')
          //   this.cookieService.set('refreshtoken', '', undefined, '/')
          //   this.cookieService.set('authority', '', undefined, '/')
          //   this.cookieService.set('expirationdate', '', undefined, '/')
          //   jwtToken = this.cookieService.get('jwt')
          //   console.log('after delete :' + jwtToken)
          // }
          return throwError(()=> new Error('Error while refreshing auth token. reset auth data.'));
        })
        // ,finalize( ()=> this.refreshRunning = false)
      )
    }

  }
  resetAuthData() {
    // console.log('Return New LoginSuccess Action ')
    // this.stopRefreshTokenTimer();

    this.cookieService.deleteAll('')
    this.cookieService.deleteAll('/')
    this.cookieService.deleteAll('/admin')
    this.cookieService.deleteAll('admin')
    var jwtToken = this.cookieService.get('jwt')
    console.log('After delete 2. jwt: ' + jwtToken)
    if (jwtToken!='') {
      this.cookieService.set('jwt', '', undefined, '/')
      this.cookieService.set('refreshtoken', '', undefined, '/')
      this.cookieService.set('authority', '', undefined, '/')
      this.cookieService.set('expirationdate', '', undefined, '/')
      jwtToken = this.cookieService.get('jwt')
      console.log('after delete 3. jwt: ' + jwtToken)
    }
    // this.appSignalStore.setAuthNotAuthenticated();
  }

  processAccessDataResponse(userAccessData: any) {
    // console.log('Return New LoginSuccess Action ')
    console.log('userAccessData=' + JSON.stringify(userAccessData))
    var expireDate = new Date(
      new Date().getTime() + 1000 * userAccessData.expires_in
    ) //userAccessData.expires_in))
    console.log('expiration date :' + expireDate)
    // this.cookiesService.set('jwt', userAccessData.access_token, expireDate, '/', undefined, true)
    // this.cookiesService.set('refreshtoken', userAccessData.refresh_token, expireDate, '/', undefined, true)
    // this.cookiesService.set('authority', userAccessData.authority, expireDate, '/', undefined, true)
    // this.cookiesService.set('expirationdate', '' + expireDate.getTime())
    // this.cookieService.set('jwt', userAccessData.access_token, undefined, '')
    // this.cookieService.set(
    //   'refreshtoken',
    //   userAccessData.refresh_token,
    //   undefined,
    //   ''
    // )
    // this.cookieService.set('authority', userAccessData.authority, undefined, '')
    // this.cookieService.set(
    //   'expirationdate',
    //   '' + expireDate.getTime(),
    //   undefined,
    //   ''
    // )

    this.cookieService.set('jwt', userAccessData.access_token, undefined, '')
    console.log('processAccessDataResponse. jwt:'+userAccessData.access_token )
    this.cookieService.set('refreshtoken', userAccessData.refresh_token, undefined, '')
    this.cookieService.set('authority', userAccessData.authority, undefined, '')
    this.cookieService.set('expirationdate','' + expireDate.getTime(), undefined, '')

    // let expireDate = this.cookieService.get('expirationdate') != undefined ? Number(this.cookieService.get('expirationdate')): 0
    console.log('after processing processAccessDataResponse, expirationdate: ' + this.cookieService.get('expirationdate'))
    // this.startRefreshTokenTimer(expireDate.getTime());
  }
  // startRefreshTokenTimer(expirationTime:number) {
  //   // parse json object from base64 encoded jwt token
  //   const timeout:number = expirationTime - Date.now() - (1 * 1000); const timeout:number = expireDate.getTime() - Date.now() - (1 * 1000);
  //   console.log('startRefreshTokenTimer timeout = '+timeout)
  //   // this.refreshTokenTimeout = setTimeout(() => this.refreshTokenObservable().subscribe(), timeout);
  // }

  // stopRefreshTokenTimer() {
  //   console.log('stopRefreshTokenTimer')
  //   // clearTimeout(this.refreshTokenTimeout);
  // }


}
