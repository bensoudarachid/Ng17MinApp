import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TrainingsService } from '@app/tenantapp/services/trainings/trainings.service';
import { timeout, catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { AuthService } from "@app/_services/auth.service";
import { loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess, refreshRequest } from "./Auth.Actions";
import { CookieService } from 'ngx-cookie-service'
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'


@Injectable()
export class AuthEffects {
    
    constructor(private action$: Actions, private service: AuthService, private cookiesService: CookieService) {
    }

    _login = createEffect(() =>
        this.action$.pipe(
            ofType(loginRequest),
            exhaustMap((action) => {
                console.log('auth effect. login by calling auth service. action:')
                console.log(action)
                return this.service.login(action.email , action.password).pipe(

                    map((userAccessData) => {
                        // console.log('get userAccessData now : '+JSON.stringify(userAccessData, null, 2))
                        return this.processAccessDataResponse(userAccessData)
                      }),
                      timeout(8000),
                      catchError((serverError) => {
                        console.log('Return New LoginError Action. error: '+serverError)
                        let errorDescr = 'Unknown server error'
                        if (serverError != undefined && serverError.name == 'TimeoutError')
                          errorDescr = 'Server is too long to respond'
                        else if (
                          serverError != undefined &&
                          serverError.error != undefined &&
                          serverError.error.error_description != undefined
                        )
                        errorDescr = serverError.error.error_description
                        // console.log(errorDescr)
                        // this.store.dispatch(new authActions.LoginFailure(errorDescr))
                        // return of(new appActions.AppError(errorDescr))
                        return of(loginFailure({ loginError: 'not good' }))
                      })
              
                )
            })
        )
    )

    _logout = createEffect(() =>
        this.action$.pipe(
            ofType(logoutRequest),
            exhaustMap((action) => {
                console.log('auth effect. logout by calling auth service. action:')
                console.log(action)
                let jwtToken = this.cookiesService.get('jwt')
                console.log('before delete:' + jwtToken)

                return this.service.logout().pipe(

                    map(() => {
                        console.log('Response from backend. send Logout success action now.')
                        this.cookiesService.deleteAll('')
                        this.cookiesService.deleteAll('/')
                        this.cookiesService.deleteAll('/admin')
                        this.cookiesService.deleteAll('admin')
                        // this.cookiesService.delete('jwt', '')
                        // this.cookiesService.delete('refreshtoken', '')
                        // this.cookiesService.delete('authority', '')
                        // this.cookiesService.delete('expirationdate', '')
                        jwtToken = this.cookiesService.get('jwt')
                        console.log('After delete 2:' + jwtToken)
                        if (jwtToken) {
                          this.cookiesService.set('jwt', '', undefined, '/')
                          this.cookiesService.set('refreshtoken', '', undefined, '/')
                          this.cookiesService.set('authority', '', undefined, '/')
                          this.cookiesService.set('expirationdate', '', undefined, '/')
                          jwtToken = this.cookiesService.get('jwt')
                          console.log('after delete 3:' + jwtToken)
                        }
              
                        return logoutSuccess()
                      }),
                      timeout(8000),
                      catchError((serverError) => {
                        console.log('Return New LoginError Action. error: '+serverError)
                        let errorDescr = 'Unknown server error'
                        if (serverError != undefined && serverError.name == 'TimeoutError')
                          errorDescr = 'Server is too long to respond'
                        else if (
                          serverError != undefined &&
                          serverError.error != undefined &&
                          serverError.error.error_description != undefined
                        )
                        errorDescr = serverError.error.error_description
                        // console.log(errorDescr)
                        // this.store.dispatch(new authActions.LoginFailure(errorDescr))
                        // return of(new appActions.AppError(errorDescr))
                        return of(loginFailure({ loginError: 'not good' }))
                      })
              
                )
            })
        )
    )

    _refreshRequest = createEffect(() =>
        this.action$.pipe(
            ofType(refreshRequest),
            exhaustMap((action) => {
                console.log('auth effect. refreshRequest. action:')
                console.log(action)

                let refreshToken = this.cookiesService.get('refreshtoken')
                let expirationDate = this.cookiesService.get('expirationdate') != undefined
                    ? Number(this.cookiesService.get('expirationdate'))
                    : undefined
                // console.log('Actual date: '+new Date().getTime())
                // if( expirationDate==undefined || refreshToken==undefined)
                //     console.log('No refresh token because no cookies')
                // if( expirationDate!=undefined && new Date(expirationDate).getTime()>new Date().getTime())
                //     console.log('No refresh token expiration date still valid')
                if (
                  expirationDate == undefined ||
                  refreshToken == undefined ||
                  refreshToken == '' ||
                  new Date(expirationDate).getTime() > new Date().getTime()
                )
                  return of({ type: 'NO_ACTION' })
                console.log(
                  'Refresh auth token! Expiration date: ' + new Date(expirationDate)
                )
                console.log('Refresh auth token! Refresh token ' + refreshToken)
          
                // let jwtToken = this.cookiesService.get('jwt')
                // console.log('before delete:' + jwtToken)
                // let refreshtoken = this.cookiesService.get('refreshtoken')
                // console.log('Auth refresh auth token request: '+refreshtoken)
                // this.cookiesService.deleteAll()
                if (
                  refreshToken == 'null' ||
                  refreshToken == 'undefined' ||
                  refreshToken == undefined ||
                  refreshToken == ''
                ) {
                  console.log('Refresh auth token! return undefined')
                  return of({ type: 'NO_ACTION' })
                } else {
                  console.log('Refresh auth token! call authService')
                }          

                return this.service.login("email" , "action.password").pipe(

                    map((userAccessData) => {
                        // console.log('get userAccessData now : '+JSON.stringify(userAccessData, null, 2))
                        return this.processAccessDataResponse(userAccessData)
                      }),
                      timeout(8000),
                      catchError((serverError) => {
                        console.log('Return New LoginError Action. error: '+serverError)
                        let errorDescr = 'Unknown server error'
                        if (serverError != undefined && serverError.name == 'TimeoutError')
                          errorDescr = 'Server is too long to respond'
                        else if (
                          serverError != undefined &&
                          serverError.error != undefined &&
                          serverError.error.error_description != undefined
                        )
                        errorDescr = serverError.error.error_description
                        // console.log(errorDescr)
                        // this.store.dispatch(new authActions.LoginFailure(errorDescr))
                        // return of(new appActions.AppError(errorDescr))
                        return of(loginFailure({ loginError: 'not good' }))
                      })
              
                )
            })
        )
    )
    
    // _loadTraining = createEffect(() =>
    //     this.action$.pipe(
    //         ofType(loadTraining),
    //         exhaustMap((action) => {
    //             console.log('training effect. load trainings by calling service')
    //             return this.service.getTrainings().pipe(
    //                 map((data) => {
    //                     return loadTrainingSuccess({ list: data })
    //                 }),
    //                 catchError((_err) => of(loadTrainingFail({ errormessage: _err.message })))
    //             )
    //         })
    //     )
    // )

    private processAccessDataResponse(userAccessData: any) {
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
        this.cookiesService.set('jwt', userAccessData.access_token, undefined, '')
        this.cookiesService.set(
          'refreshtoken',
          userAccessData.refresh_token,
          undefined,
          ''
        )
        this.cookiesService.set('authority', userAccessData.authority, undefined, '')
        this.cookiesService.set(
          'expirationdate',
          '' + expireDate.getTime(),
          undefined,
          ''
        )
    
        // this.cookiesService.set('authority', userAccessData.re)
        // this.router.navigate(['/']);
        return loginSuccess(userAccessData.authority)
        
      }
//     _getTraining = createEffect(() =>
//     this.action$.pipe(
//         ofType(getTraining),
//         exhaustMap((action) => {
//             return this.service.GetTrainingbycode(action.code).pipe(
//                 map((data) => {
//                     return getTrainingSuccess({ obj: data })
//                 }),
//                 catchError((_err) => of(emptyAction()))
//             )
//         })
//     )
// )

//     _addTraining = createEffect(() =>
//         this.action$.pipe(
//             ofType(addTraining),
//             switchMap((action) => {
//                 return this.service.CreateTraining(action.inputdata).pipe(
//                     switchMap(() => {
//                         return of(addTrainingSuccess(), showAlert({ message: 'Added successfully', resptype: 'pass' }))
//                     }),
//                     catchError((_err) => of(showAlert({ message: 'Failed to add', resptype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _updateTraining = createEffect(() =>
//         this.action$.pipe(
//             ofType(updateTraining),
//             switchMap((action) => {
//                 return this.service.UpdateTraining(action.inputdata).pipe(
//                     switchMap(() => {
//                         return of(updateTrainingSuccess(), showAlert({ message: 'Updated successfully', resptype: 'pass' }))
//                     }),
//                     catchError((_err) => of(showAlert({ message: 'Failed to update', resptype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _deleteTraining = createEffect(() =>
//         this.action$.pipe(
//             ofType(deleteTraining),
//             switchMap((action) => {
//                 return this.service.DeleteTraining(action.code).pipe(
//                     switchMap(() => {
//                         return of(deleteTrainingSuccess({code:action.code}), showAlert({ message: 'Removed successfully', resptype: 'pass' }))
//                     }),
//                     catchError((_err) => of(showAlert({ message: 'Failed to delete', resptype: 'fail' })))
//                 )
//             })
//         )
//     )

}