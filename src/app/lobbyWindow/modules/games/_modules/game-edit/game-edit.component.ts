import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Game } from 'src/app/lobbyWindow/_shared/_models/game';
import { GameService } from 'src/app/lobbyWindow/_shared/_services/game/game.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit {
  @Input() newGame: Game;
  @Output() gameSend: EventEmitter<String> = new EventEmitter();
  public gameName = new FormControl('', [Validators.required]);
  public description = new FormControl('', [Validators.required]);

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }
  //--------------------Data Setup




  //--------------------Caller Method
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





  //--------------------Caller Method
  prepNewGame(){
    this.gameSend.emit("resetGame");
  }
  
  startNewGame(){
    this.gameSend.emit("createGame");
  }




  

  //--------------------Service Methods

}
