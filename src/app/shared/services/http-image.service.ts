import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpImageService {

  constructor(private http: HttpClient) { }
  getImage(imgUrl: string) {
    // let params = new HttpParams()
    // params =params.set('grant_type','password')
    // const httpOptions = {
    //   // params,
    //   // headers: new HttpHeaders({
    //   //   'Content-Type': 'application/x-www-form-urlencoded',
    //   //   'Authorization': 'Basic ' + btoa('clientapp:123456')
    //   // })
    // }

    return this.http.get(imgUrl,{responseType: 'blob'})//.map(e => URL.createObjectURL(e))

  }  
}
