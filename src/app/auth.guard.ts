import { CanActivateFn, Router } from '@angular/router';
import { MasterService } from './_services/master.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  let service = inject(MasterService);
  let router = inject(Router);
  if(service.haveAccess()) {
    return true;
  }else{
    alert('unauthorised access')
    router.navigate(['/']);
    return false;
  }
  
};
