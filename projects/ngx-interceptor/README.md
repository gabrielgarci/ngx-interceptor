# NgxInterceptor

[![npm version](https://badge.fury.io/js/ngx-interceptor.svg)](https://www.npmjs.com/ngx-interceptor)
[![GitHub issues](https://img.shields.io/github/issues/gabrielgarci/ngx-interceptor.svg)](https://github.com/gabrielgarci/ngx-interceptor/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/gabrielgarci/ngx-interceptor/master/LICENSE)


## Install 

```
npm i ngx-interceptor
```


## Usage 

Add ngx-interceptor to your root app file.

```typescript
//app.modaule.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxInterceptorModule } from 'ngx-interceptor';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    NgxInterceptorModule.forRoot()
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
```

```html
<!-- app.component.html -->
<ngx-interceptor></ngx-interceptor>
```

## Settings

### Endpoints filter
The default behavior of the interceptor is to "catch" every http request. However, the component accepts two kind of inputs to filter these endpoints (exceptions or strict) and will filter every request which contain some of the given text. The input endpoints format could be as an array or an object: 
```typescript
const endPoints: string[] = [ 'users/id', 'users/create', 'location/nearby'];
```
or 
```typescript
const endPoints: {[key: string]: string} = {
  users: ['id', 'create'],
  location: ['nearby']
 }
 ```
 The two different endpoints filters are:
 
 - Exceptions: every endpoint will be intercepted except the given ones
 ```html
<ngx-interceptor [exceptions]="endPoints"></ngx-interceptor>
```

- Strict: only the given endpoints will be intercepted
```html
<ngx-interceptor [strict]="endPoints"></ngx-interceptor>
```

### Lag
The default behavior of the interceptor is to only show the interceptor when there is a lag of 300ms between the request and the response in order to avoid blinking effects. This lag can be modified with the following input:
```html
<ngx-interceptor lag="500"></ngx-interceptor>
```
In this example the time lag has been changed to 500ms.


### Color
The interceptor has a default blue (#0051ff) spinner to show when it is waiting a response. The spinner color can be changed easily by the following input (accept any kind of CSS color):
```html
<ngx-interceptor color="green"></ngx-interceptor>
```
or
```html
<ngx-interceptor color="#008000"></ngx-interceptor>
```
or
```html
<ngx-interceptor color="rgb(0,128,0)"></ngx-interceptor>
```


### Custom spinner/modal
Default spinner can be easily replace with a custom spinner or modal wrapping the content inside the ngx-interceptor tag:
```html
<ngx-interceptor>
    //... Add here the custom html content
</ngx-interceptor>
```