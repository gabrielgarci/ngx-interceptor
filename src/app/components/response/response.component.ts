import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  @Input() character: Character;

  constructor() { }

  ngOnInit(): void {
  }

}
