import { TrainingModel } from "@model/TrainingModel";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { AppModel } from "@src/_model/AppModel";
import { Training } from "@src/_model/Training";
import { TrainingsService } from "../tenantapp/services/trainings/trainings.service";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, catchError, lastValueFrom, map, pipe, retry, share, switchMap, takeUntil, tap, throwError, timer } from "rxjs";

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthService } from "../_services/auth.service";
import { CookieService } from "ngx-cookie-service";

const initialState: AppModel = {
  auth: {
    isFetching: false,
    isRegistrationFetching: false,
    isAuthenticated: false, //cookie.load('jwt') ? true : false,
    authority: '', //cookie.load('authority'),
    registrationStep: 1,
    registrationError: {},
  },
  training: {
    list: [], //<Training[]>
    errorMessage: 'wow',
    editData:{
      id: -1,
      title: "",
      secondaryTitle: "",
      shortDescription: "",
      longDescription: "",
      duration: 0
    },
  },

}

const stopPolling = new Subject();


export const AppSignalStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods(
     (store, authService=inject(AuthService) , trainingsService=inject(TrainingsService), cookieService=inject(CookieService)) =>({
          async loadAllTrainingsAsync(){
            var list: any[] = []
            try{
              console.log('loadAllTrainingsAsync. service get data. wahnsinn:')
              list = await lastValueFrom(trainingsService.getTrainings3());
              console.log('loadAllTrainingsAsync. service get data. wahnsinn value:'+JSON.stringify(list, null, 2) )
              const lastList = store.training.list();
              console.log('loadAllTrainingsAsync.Store training:'+JSON.stringify(store.training(), null, 2) )
            }catch (error) {
              console.log('loadAllTrainingsAsync. service get data. wahnsinn error:')
            }                 
            patchState(store, (store)=>( { training:{...store.training,  list  }}))
            //   return await lastValueFrom( trainingsService.getTrainings3()) ;
               //     .pipe(
               //       map((p) => p)
               //     );
          },
          async loadTrainingAsync(trainingId: Number){
            var tr: Training
            try{
              // console.log('loadTrainingAsync. trainingId:'+trainingId)
              console.log('loadTrainingAsync. store.training.list before:',store.training.list())
              patchState(store, (store)=>( { training:{...store.training,  editData:{
                id: -1,
                title: "",
                secondaryTitle: "",
                shortDescription: "",
                longDescription: "",
                duration: 0
              }
              }}))
              if( trainingId == -1)
                return

              tr = await lastValueFrom(trainingsService.getTraining(trainingId));
              // console.log('loadTrainingAsync. service get data. value:'+JSON.stringify(tr, null, 2) )
              // const lastList = store.training.list();
              // console.log('loadAllTrainingsAsync.Store training:'+JSON.stringify(store.training(), null, 2) )
              let arr = store.training.list();
              let index = arr.findIndex(item => item.id === trainingId);
              if (index !== -1 ) {
                  arr[index] = tr; // Replaces the object with id 2
              }
              
              // patchState(store, (store)=>( { training:{...store.training,  editData:tr  }}))
              // patchState(store, (store)=>( { training:{...store.training,  list:arr  }}))
              patchState(store, (store)=>( { training:{...store.training,  list:arr, editData:tr  }}))
              // console.log('loadTrainingAsync. store.training.list after:',store.training())
              
            }catch (error) {
              console.log('loadTrainingAsync. service get data. wahnsinn error:')
            }
          },
          async saveTrainingAsync(trainingFormValue: Training, file?: File | null) {
            var tr: Training;
            try {
              console.log('saveTrainingAsync. form data:', trainingFormValue);
              console.log('saveTrainingAsync. edit training :', store.training.editData());
              Object.assign(store.training.editData(), trainingFormValue);
              console.log('saveTrainingAsync. edit training after assign:', store.training.editData());
              
              tr = await lastValueFrom(trainingsService.saveTraining(store.training.editData(), file));
              
              let arr = store.training.list();
              let index = arr.findIndex(item => item.id === store.training.editData.id());
              if (index !== -1) {
                arr[index] = tr;
              }
              
              patchState(store, (store) => ({ training: { ...store.training, list: arr, editData: tr } }));
              
            } catch (error) {
              console.log('saveTrainingAsync. service get data error:', error);
            }
          },
          async createNewTrainingAsync() {
            const newTraining: Training = {
              id: -1,
              title: "",
              secondaryTitle: "",
              shortDescription: "",
              longDescription: "",
              duration: 0
            };
            patchState(store, (store)=>( { training:{...store.training, editData: newTraining }}));
          },
          async deleteTrainingAsync(trainingId: number) {
            try {
              await lastValueFrom(trainingsService.deleteTraining(trainingId));
              let arr = store.training.list();
              arr = arr.filter(item => item.id !== trainingId);
              patchState(store, (store)=>( { training:{...store.training, list:arr }}));
            } catch (error) {
              console.log('deleteTrainingAsync error:', error);
            }
          },
          loadAllTrainings() {
               trainingsService.getTrainings3().subscribe((list) => {
                //  console.log('loadAllTrainings tani dima. service get data:'+JSON.stringify(list, null, 2) )
                 const lastList = store.training.list();
                 patchState(store, (store)=>( { training:{...store.training,  list  }}))
                //  console.log('loadAllTrainings tani dima.Store training:'+JSON.stringify(store.training(), null, 2) )
               });
          },
          setAuthNotAuthenticated() {
            patchState(store, (store)=>( { auth:{...store.auth,  isAuthenticated:false, isFetching: false  }}))
          },
          async login(email: string, password: string) {
            patchState(store, (store)=>( { auth:{...store.auth,  isFetching: true  }}))
            const userAccessData = await lastValueFrom(authService.loginObservable(email, password));
            // console.log('obs login. userAccessData:'+JSON.stringify(userAccessData, null, 2) )

            // console.log('userAccessData=' + JSON.stringify(userAccessData))
            // var expireDate = new Date(
            //   new Date().getTime() + 1000 * userAccessData.expires_in
            // ) 
            // console.log('expiration date :' + expireDate)
            // cookieService.set('jwt', userAccessData.access_token, undefined, '')
            // console.log('login jwt:'+userAccessData.access_token )
            // cookieService.set('refreshtoken', userAccessData.refresh_token, undefined, '')
            // cookieService.set('authority', userAccessData.authority, undefined, '')
            // cookieService.set('expirationdate','' + expireDate.getTime(), undefined, '')
            authService.processAccessDataResponse(userAccessData)
            patchState(store, (store)=>( { auth:{...store.auth,  isAuthenticated:true, isFetching: false  }}))

            // console.log('login signal store auth:'+JSON.stringify(store.auth(), null, 2) )

            // const userAccessData2 = await lastValueFrom(authService.refreshTokenObservable());
            // console.log('Observable RefreshToken. userAccessData:'+JSON.stringify(userAccessData2, null, 2))
              //todo set state here
            // return loginSuccess(userAccessData.authority)
          },
          async logout() {
            // let refreshToken = cookieService.get('refreshtoken')
            // const userAccessData2 = await lastValueFrom(authService.refreshTokenTest(refreshToken));
            // console.log('Observable RefreshToken. userAccessData:'+JSON.stringify(userAccessData2, null, 2))

            patchState(store, (store)=>( { auth:{...store.auth,  isFetching: true  }}))
            authService.resetAuthData()
            await lastValueFrom(authService.logout());
            stopPolling.next('logout')
            // authService.stopRefreshTokenTimer()
            // cookieService.deleteAll('')
            // cookieService.deleteAll('/')
            // cookieService.deleteAll('/admin')
            // cookieService.deleteAll('admin')
            // jwtToken = cookieService.get('jwt')
            // console.log('After delete 2:' + jwtToken)
            // if (jwtToken!='') {
            //   cookieService.set('jwt', '', undefined, '/')
            //   cookieService.set('refreshtoken', '', undefined, '/')
            //   cookieService.set('authority', '', undefined, '/')
            //   cookieService.set('expirationdate', '', undefined, '/')
            //   jwtToken = cookieService.get('jwt')
            //   console.log('after delete 3:' + jwtToken)
            // }
            patchState(store, (store)=>( { auth:{...store.auth,  isAuthenticated:false, isFetching: false  }}))
            // console.log('store auth:'+JSON.stringify(store.auth(), null, 2) )
            console.log('obs logout . done')
          },
          async refreshAuthToken() {
            // patchState(store, (store)=>( { auth:{...store.auth,  isFetching: true  }}))
            // const userAccessData:any = await lastValueFrom(authService.refreshTokenObservable());
            
            let expireDate = cookieService.get('expirationdate') != undefined ? Number(cookieService.get('expirationdate')): 0
            // const timeout:number = expirationTime - Date.now() - (1 * 1000); 
            console.log('refresh token Date now:'+Date.now() )
            console.log('refresh token expireDate:'+cookieService.get('expirationdate') )
            
            const timeout:number = expireDate - Date.now() - (10 * 1000);
            console.log('refresh token timeout 3: '+timeout )

            // const timeout = expirationDate.getTime() - Date.now() - (1 * 1000);
            const userAccessData:any = await lastValueFrom(timer(timeout, 280000).pipe(
              switchMap(() => { 
                const refreshTO = authService.refreshTokenObservable()
                return refreshTO.pipe(
                  map((userAccessData) =>{
                    console.log('refresh token using userAccessData:'+JSON.stringify(userAccessData, null, 2) )
                    authService.processAccessDataResponse(userAccessData)
                    patchState(store, (store)=>( { auth:{...store.auth,  isAuthenticated:true  }}))
                  }
                  ),
                  catchError(error => {
                    authService.resetAuthData()
                    patchState(store, (store)=>( { auth:{...store.auth,  isAuthenticated:false  }}))
                    stopPolling.next('stop_polling')
                    return throwError(()=> new Error('Error while refreshing auth token. reset auth data.'));
                  })
                )                
              } ),
              retry(), 
              share(),
              takeUntil(stopPolling)
            ));
            console.log('processAccessDataResponse : '+JSON.stringify(userAccessData, null, 2))
            // const userAccessData:any = await timer(1, 10000).pipe(
            //   switchMap(() => authService.refreshTokenObservable()),
            //   retry(), 
            //   share()
            // );
            // timer(1, 10000).pipe(
            //   switchMap(() => authService.refreshTokenObservable()),
            //   retry(), 
            //   share()
            // );
            // authService.refreshTokenObservable.subscribe((list) => {
            //   //  console.log('loadAllTrainings tani dima. service get data:'+JSON.stringify(list, null, 2) )
            //    const lastList = store.training.list();
            //    patchState(store, (store)=>( { training:{...store.training,  list  }}))
            //   //  console.log('loadAllTrainings tani dima.Store training:'+JSON.stringify(store.training(), null, 2) )
            //  });

        
            // patchState(store, (store)=>( { auth:{...store.auth,  isAuthenticated:true, isFetching: false  }}))
            // console.log('loging signa store auth:'+JSON.stringify(store.auth(), null, 2) )
            // console.log('obs logout . done')
          },
                    
     })
  )
);

// function rxMethod<T>(arg0: any): any {
//      throw new Error("Function not implemented.");
// }
