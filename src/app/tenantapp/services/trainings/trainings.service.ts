import { Injectable, inject, signal } from '@angular/core';
import { Training } from '@model/Training';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConnection } from '@app/shared/services/api-connection.service';
import { Observable, catchError, map, of, retry, throwError } from 'rxjs';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
import { patchState } from '@ngrx/signals';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  
  // appSignalStore = inject(AppSignalStore)
  trainingsSignal = signal<any | null>(null); // set null initial value

  constructor(private http: HttpClient) {}

  // getTrainings() {
  //   console.log('TrainingsService. load trainings now')
  //   // this.http.get<Training[]>('http://reactlearn.schoolapi.royasoftware.com:8088/api/trainings/123');
    
  //   return this.http.get<Training[]>(ApiConnection.API_ENDPOINT+'/api/trainings/123');
  //   // return this.http.get<Training[]>('http://abbaslearn.sc.royasoftware.com:8088/api/trainings/123');
  // }

  // getTrainings2() {
  //   console.log('TrainingsService. load trainings now tani')
  //   // this.http.get<Training[]>('http://reactlearn.schoolapi.royasoftware.com:8088/api/trainings/123');
    
  //   this.http.get<Training[]>(ApiConnection.API_ENDPOINT+'/api/trainings/123').subscribe((list) => {
  //     console.log('service get data:' + list)
  //     // patchState(this.appSignalStore, (state)=>( { training:{...state.training,  list  }}))
  //   });
  // }

  getTrainings3(): Observable<Training[]> {
    console.log('TrainingsService. load trainings 3. Calling '+ApiConnection.API_ENDPOINT+'/api/trainings/123')
    return this.http.get<any>(ApiConnection.API_ENDPOINT+'/api/trainings/123').pipe(
      catchError(error => {
        console.error('Error fetching trainigs JSON data:', JSON.stringify(error.message));
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    );
  }

  // getTrainings4(){
  //   const httpClient = inject(HttpClient);

  //   return () => {
  //     console.log('getTrainings3. service get data:')
  //     return httpClient.get<Training[]>(`ApiConnection.API_ENDPOINT+'/api/trainings/123`)
  //       .pipe(
  //         retry(3),
  //         catchError((error) => {
  //           console.error('Error fetching profile:', error);
  //           return of(1);
  //         })
  //       )
  //       .subscribe((data) => {
  //         // subscribe to a signal to receive updates.
  //         console.log('API Response:', data);
  //         this.trainingsSignal.set(data);
  //         console.log('set userProfileSignal', this.trainingsSignal);
  //       });
  //   }
  // }
  getTraining(trainingId: Number): Observable<Training> {
    console.log('TrainingsService. load training')
    return this.http.get<any>(ApiConnection.API_ENDPOINT+'/api/training/item/'+trainingId).pipe(
      catchError(error => {
        console.error('Error fetching training JSON data:', JSON.stringify(error.message));
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    );
  }
  saveTraining(training: Training, file?: File | null): Observable<Training> {
    console.log('TrainingsService. save training');
    console.log(training.id);
    let headers = new HttpHeaders();
    var body = new FormData();
    body.append(
      'trainingParam',
      new Blob([JSON.stringify(training)], { type: 'application/json' })
    );
    
    if (file) {
      body.append('uploadfile', file);
    }
  
    var endpoint = '/api/training/updatetraining';
    if (training.id == -1) {
      endpoint = '/api/training/savetraining';
    }
  
    console.log('TrainingsService. call endpoint ' + endpoint);
    return this.http
      .post<Training>(
        ApiConnection.API_ENDPOINT + endpoint,
        body,
        {
          headers: headers,
        }
      )
      .pipe(
        catchError(error => {
          console.error('Error saving training:', JSON.stringify(error.message));
          return throwError(() => new Error('Something went wrong; please try again later.'));
        })
      );
  }

  deleteTraining(trainingId: number): Observable<any> {
    console.log('TrainingsService. delete training')
    return this.http.delete<any>(ApiConnection.API_ENDPOINT+'/api/training/deletetraining/'+trainingId).pipe(
      catchError(error => {
        console.error('Error deleting training:', JSON.stringify(error.message));
        return throwError(()=> new Error('Something went wrong while deleting; please try again later.'));
      })
    );
  }

}
// export const getTrainings4 = (): () => Observable<Training[]> => {
//   const httpClient = inject(HttpClient);

//   return () => {
//     console.log('getTrainings3. service get data:')
//     return httpClient.get<Training[]>(`ApiConnection.API_ENDPOINT+'/api/trainings/123`)
//       .pipe(
//         map((p) => p)
//       );
//   }
// }
