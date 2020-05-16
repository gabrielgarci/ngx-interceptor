import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IHttpState, HttpProgressState } from './interceptors.utils';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpStateService } from './http-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-interceptor',
  templateUrl: './ngx-interceptor.component.html',
  styleUrls: ['./ngx-interceptor.component.scss']
})
export class NgxInterceptorComponent implements OnInit, OnDestroy {
  @Input() public exceptions: string[] | {} | null = null;
  @Input() public strict: string[] | {} | null = null;
  @Input() public lag = 300;
  @Input() public color = '#0051ff';
  @Input() public requestLag = 0; // Only for demo

  public show = false;
  private slowRequests: string[] = []; // Store the endpoints which exceeds the lag time
  private pending: string[] = []; // Store every endpoint for which we are waiting a response
  private endPoints: string[] = []; // Store formatted endpoints for the url filter
  private strictMode = false; // Define the mode for the formatted endPoints filter
  private subscription: Subscription;

  constructor(
    private httpStateService: HttpStateService,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.isColor(this.color);
    if (this.exceptions || this.strict) {
      this.detectMode();
    }
    this.subscribeHttp();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Check if the given color is valid
  private isColor(strColor: string): void {
    const s = new Option().style;
    s.color = strColor;
    if (!s.color) {
      this.color = '#0051ff';
      console.warn('[Interceptor library] Provided color is not a valid CSS color. Default color has been selected.');
    }
  }

  // "Catch" the request
  private subscribeHttp(): void {
    this.subscription = this.httpStateService.state.subscribe((progress: IHttpState) => {
      if (progress && progress.url) {
        this.filterRequest(progress);
      }
    });
  }

  // Choose between strict or expection mode
  private detectMode(): void {
    if (this.exceptions && this.strict) {
      console.warn('[Interceptor library] exceptions and strict modes have been selected simultaneously. Only exceptions will be considered.');
    }
    try {
      this.inputHandler(this.exceptions ? this.exceptions : this.strict);
      this.strictMode = (this.strict && !this.exceptions);
    } catch (err) {
      console.error(err.message);
    }
  }

  // Format the input endpoints
  private inputHandler(inputData: string[] | {} | null): void {
    if (Array.isArray(inputData)) {
      this.endPoints = inputData;
    } else if (typeof inputData === 'object') {
      Object.keys(inputData).forEach( key => this.endPoints.push(`${key}/${inputData[key]}`));
    } else {
      throw new Error('[Interceptor library] Exceptions input has not the correct format! Default mode has been selected. Check the documentation to know more about allowed formats');
    }
  }

  // Filter the request depending the mode and given data
  private filterRequest(progress: IHttpState): void {
    if (
      !this.endPoints ||
      (!this.strictMode && !this.endPoints.some( endPoint => progress.url.indexOf(endPoint) !== -1)) ||
      (this.strictMode && this.endPoints.some( endPoint => progress.url.indexOf(endPoint) !== -1))
      ) {
      this.httpHandler(progress);
    }
  }

  // Handle the requests and decide if the interceptor is required (there is at least one request in the slowRequests array)
  private httpHandler(progress: IHttpState): void {
    if (progress.state === HttpProgressState.start && !this.pending.some(storedUrl => progress.url === storedUrl)) {
      this.pending.push(progress.url);
      if (this.lag) {
        setTimeout(() => {
          if (this.pending.some(storedUrl => progress.url === storedUrl)) {
            this.slowRequests.push(progress.url);
            this.show = true;
          }
        }, this.lag);
      }
    } else if (progress.state === HttpProgressState.end && this.pending.some(storedUrl => progress.url === storedUrl)) {
      setTimeout(() => {
        this.pending.splice(this.pending.indexOf(progress.url), 1);
        if (this.lag && this.slowRequests.some(slowRequest => slowRequest === progress.url)) {
          this.slowRequests.splice(this.slowRequests.indexOf(progress.url), 1);
        }
        this.show = this.lag ? this.slowRequests.length !== 0 : this.pending.length !== 0;
      }, this.requestLag);
    }
    this.show = this.lag ? this.slowRequests.length !== 0 : this.pending.length !== 0;
  }


}
