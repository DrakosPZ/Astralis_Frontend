import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Game } from 'src/app/_shared/_models/game';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit {
  @Input() newGame: Game;
  public gameName = new FormControl('', [Validators.required]);
  public description = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

  allFilled(){
    if(this.gameName.hasError('required') || 
       this.description.hasError('required')){
      return false;
    }
    return true;
  }
  
  getErrorMessageGameName() {
    if (this.gameName.hasError('required')) {
      return 'You must enter a value';
    }
  }
  
  getErrorMessageDescription() {
    if (this.description.hasError('required')) {
      return 'You must enter a value';
    }
  }

}
