import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'


@NgModule({
  declarations: [
  ],

  imports: [
    // FormsModule,
    // ReactiveFormsModule,
    // BrowserModule,
    // HttpClientModule,
    // BrowserAnimationsModule,
    // RouterModule.forRoot(routes),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    CookieService
  ]
})
export class AppModule {}
