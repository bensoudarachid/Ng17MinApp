import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'


//I found no other solution for making CookieService injectable without using app.module.ts

@NgModule({
  declarations: [
  ],

  imports: [
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    CookieService
  ]
})
export class AppModule {}
