import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ApiConnection {

  constructor() { }
  public static API_ENDPOINT: string

  // public static API_ENDPOINT =
  //   window.location.protocol + '//' + window.location.hostname + ':8080'
  public static isTenantApp=true
  static initialize() {
    console.log('ApiConnection.initialize()');
    // console.log(JSON.stringify(window, null, 2));
    if( typeof window === "undefined"){
      console.log('window undefined. Return.')
      return;
    }else
      console.log('window keineAhnung. Return.')
    ApiConnection.API_ENDPOINT = environment.production
    ? window.location.protocol +
      '//' +
      window.location.hostname +
      ':' +
      window.location.port
    : window.location.protocol + '//' + window.location.hostname + ':8088'

    // public static API_ENDPOINT =
    //   window.location.protocol + '//' + window.location.hostname + ':8080'
    let hostnameSplit = window.location.hostname.split('.', 5)
    let tenantName = hostnameSplit[hostnameSplit.length-4];
    // console.log('hostnameSplit tenant='+require('util').inspect(hostnameSplit[hostnameSplit.length-4], false, null))
    console.log('hostnameSplit tenant='+JSON.stringify(hostnameSplit[hostnameSplit.length-4], null, 2))
    
    if(tenantName == "admin" || tenantName == "welcome" ){
      ApiConnection.isTenantApp=false
    }
    // console.log('ApiConnectionService.isTenantApp='+require('util').inspect(ApiConnection.isTenantApp, false, null))
    console.log('ApiConnectionService.isTenantApp='+JSON.stringify(ApiConnection.isTenantApp, null, 2))
    
    //ApiConnection.isTenantApp = window.location.hostname.split('.', 5).length > 3
  }
}
ApiConnection.initialize()