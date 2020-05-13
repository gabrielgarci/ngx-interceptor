import { TestBed } from '@angular/core/testing';

import { NgxInterceptorService } from './ngx-interceptor.service';

describe('NgxInterceptorService', () => {
  let service: NgxInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
