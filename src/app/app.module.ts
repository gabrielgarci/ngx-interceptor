import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxInterceptorModule } from 'ngx-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ResponseComponent } from './components/response/response.component';
import { SettingsComponent } from './components/settings/settings.component';



@NgModule({
  declarations: [
    AppComponent,
    ResponseComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxInterceptorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
