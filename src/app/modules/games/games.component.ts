import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Game } from 'src/app/_shared/_models/game';
import { User } from 'src/app/_shared/_models/user';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { LoginService } from 'src/app/_shared/_services/login/login.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  currentUser: User;

  //--------------------JoinedGame Tab
  joinedGames: Game[];




  //--------------------SearchedGame Tab




  //--------------------NewGame Tab
  newGame: Game;
  public gameName = new FormControl('', [Validators.required]);
  public description = new FormControl('', [Validators.required]);



  
  constructor(private gameService: GameService,
              private loginService: LoginService) {
    this.getCurrentUser();
    this.newGame = new Game();
   }

  ngOnInit(): void {
  }

  //--------------------Data Setup
  /**
   * Gets the currently logged in User from the login Service 
   * and sets it as the localPartner.
   */
  getCurrentUser(): void{
    this.loginService.getCurrentUser()
    .pipe(first())
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        this.callForJoinedGames();
      });
  }






  //--------------------Mat Tab Method
  
  checkForTab(event){
    switch (event.index) {
      case 0:
        this.callForJoinedGames();
        break;
      case 1:
        
        break;
      case 2:
        this.prepNewGame();
        break;
    }
  }





  //--------------------Caller Method
  callForJoinedGames(){
    this.getJoinedGames(this.currentUser.identifier)
  }
  
  prepNewGame(){
    this.newGame = new Game();
  }
  
  startNewGame(){
    this.postNewGame(this.newGame);
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




  

  //--------------------Service Methods
  getJoinedGames(uIdentifier: string){
    this.gameService.getJoinedGames(uIdentifier)
          .pipe(first()).subscribe(games =>  {
            console.log(games);
            this.joinedGames = games});
  }

  postNewGame(newGame: Game){
    this.gameService.startGame(newGame, this.currentUser.identifier)
          .pipe(first()).subscribe(games =>  this.joinedGames = games);
  }



  

}
