import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInterceptorComponent } from './ngx-interceptor.component';

describe('NgxInterceptorComponent', () => {
  let component: NgxInterceptorComponent;
  let fixture: ComponentFixture<NgxInterceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxInterceptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
