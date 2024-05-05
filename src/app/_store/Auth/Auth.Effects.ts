import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TrainingsService } from '@app/tenantapp/services/trainings/trainings.service';
import { timeout, catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { AuthService } from "@app/_services/auth.service";
import { loginRequest, loginSuccess, loginFailure } from "./Auth.Actions";
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