import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxInterceptorComponent } from './ngx-interceptor.component';
import { CommonModule } from '@angular/common';
import { NgxInterceptorService } from './ngx-interceptor.service';
import { HttpStateService } from './http-state.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [NgxInterceptorComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxInterceptorComponent]
})
export class NgxInterceptorModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: NgxInterceptorModule,
        providers: [
            NgxInterceptorService,
            HttpStateService,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: NgxInterceptorService,
                multi: true
            }
        ]
    };
  }
}
