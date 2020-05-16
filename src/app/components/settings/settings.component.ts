import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  @Input() interceptorDelay: number;
  @Input() requestDelay: number;
  @Input() inputColor: string;
  @Output() requestData: EventEmitter<any> = new EventEmitter();

  public totalWidth: number;
  public requestWidth: string;
  public interceptorMargin: string;
  public disableBtn = false;

  constructor( ) {}

  ngOnInit() {
    this.resize();
  }

  public resize() {
    this.totalWidth = (this.requestDelay > (this.interceptorDelay + 75)) ? this.requestDelay : (this.interceptorDelay);
    this.interceptorMargin = (this.interceptorDelay && this.interceptorDelay > this.requestDelay) ?
      `calc(${((this.interceptorDelay / this.totalWidth) * 100 + '%')} - 175px)` : '0%';
    this.requestWidth = this.requestDelay ?
      (this.interceptorDelay) ? (this.requestDelay / this.totalWidth) * 100 + '%' : 'calc(100% - 100px)' :
      this.interceptorDelay ? 20 + '%' : 'calc(100% - 100px)';
  }

  private isColor(strColor: string): boolean {
    const s = new Option().style;
    s.color = strColor;
    if (!s.color) {
      this.inputColor = '#0051ff';
    }
    return s.color ? true : false;
  }

  public updateColor(): void {
    this.inputColor = this.isColor(this.inputColor) ? this.inputColor : '#838383';
  }

  public emitRequest(): void {
    const requestData = {
      interceptorDelay: this.interceptorDelay,
      requestDelay: this.requestDelay,
      inputColor: this.inputColor
    }
    this.requestData.emit(requestData);
  }
}
