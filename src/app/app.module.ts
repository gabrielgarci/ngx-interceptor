import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxInterceptorModule } from 'ngx-interceptor';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxInterceptorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
