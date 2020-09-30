import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/_shared/_models/game';

@Component({
  selector: 'app-game-inspection',
  templateUrl: './game-inspection.component.html',
  styleUrls: ['./game-inspection.component.scss']
})
export class GameInspectionComponent implements OnInit {

  @Input() displayed: Game;

  constructor() { }

  ngOnInit(): void {
  }

}
