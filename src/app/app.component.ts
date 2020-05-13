import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-interceptor-library';

  constructor( private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://slowwly.robertomurray.co.uk/delay/0/url/https://rickandmortyapi.com/api/character/2').subscribe(resp => {
        console.log(resp);
      });
    this.http.get('http://slowwly.robertomurray.co.uk/delay/3000/url/https://rickandmortyapi.com/api/character/6').subscribe(resp => {
        console.log(resp);
      });
  }
}
