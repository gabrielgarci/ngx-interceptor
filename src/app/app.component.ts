import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from './models/character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public character: Character;
  public interceptorLag = 300;
  public requestLag = 1000;
  public color = '#0051ff';

  constructor( private http: HttpClient) {}

  public onRequestData(requestData) {
    this.color = requestData.inputColor;
    this.interceptorLag = requestData.interceptorDelay > 0 ? requestData.interceptorDelay : 0;
    this.requestLag = requestData.requestDelay > 0 ? requestData.requestDelay : 0;
    const randomCharacter = Math.floor(Math.random() * 591);
    this.http.get(`https://rickandmortyapi.com/api/character/${randomCharacter}`)
      .subscribe(
        (resp: any) => {
          setTimeout(() => {
            this.character = {
              name: resp.name,
              img: resp.image,
              status: resp.status,
              species: resp.species,
              planet: resp.location.name
            };
          }, this.requestLag);
        },
        err => console.error(err)
      );
  }
}
