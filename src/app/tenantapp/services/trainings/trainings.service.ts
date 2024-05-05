import { Injectable } from '@angular/core';
import { Training } from '@model/Training';
import { HttpClient } from '@angular/common/http';
import { ApiConnection } from '@app/shared/services/api-connection.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  constructor(private http: HttpClient) {}

  getTrainings() {
    console.log('TrainingsService. load trainings now')
    // this.http.get<Training[]>('http://reactlearn.schoolapi.royasoftware.com:8088/api/trainings/123');
    
    return this.http.get<Training[]>(ApiConnection.API_ENDPOINT+'/api/trainings/123');
    // return this.http.get<Training[]>('http://abbaslearn.sc.royasoftware.com:8088/api/trainings/123');
  }

}
