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

  /**
   * Method to contain custom component initialization behaviour
   */
  ngOnInit(): void {
  }
  //--------------------Data Setup




  //--------------------Caller Method
  /**
   * Checks if all FormControls are valid.
   * @returns true if all formcontrols have no Errors
   */
  allFilled(){
    if(this.gameName.hasError('required') || 
       this.description.hasError('required')){
      return false;
    }
    return true;
  }
  
  /**
   * Checks if gameName Input has an Error, if so it returns an error message.
   * @returns error Message as string
   */
  getErrorMessageGameName() {
    if (this.gameName.hasError('required')) {
      return 'You must enter a value';
    }
  }
  
  /**
   * Checks if description Input has an Error, if so it returns an error message.
   * @returns error Message as string
   */
  getErrorMessageDescription() {
    if (this.description.hasError('required')) {
      return 'You must enter a value';
    }
  }





  //--------------------Caller Method
  /**
   * Method to emit resetGameFlag to games component.
   */
  prepNewGame(){
    this.gameSend.emit("resetGame");
  }
  
  /**
   * Method to emit createGameFlag to games component.
   */
  startNewGame(){
    this.gameSend.emit("createGame");
  }




  

  //--------------------Service Methods

}
