import { Injectable } from '@angular/core';
import { HttpStateService } from './http-state.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpProgressState } from './interceptors.utils';


@Injectable({
  providedIn: 'root'
})
export class NgxInterceptorService implements HttpInterceptor {

  constructor(private httpStateService: HttpStateService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.httpStateService.state.next({
      url: request.url,
      state: HttpProgressState.start
    });

    return next.handle(request).pipe(
      finalize(() => {
      this.httpStateService.state.next({
        url: request.url,
        state: HttpProgressState.end
      });
    }));
  }
}
