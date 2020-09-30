import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { GameDetail } from 'src/app/_shared/_models/details/gameDetail';
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
  inspectedGame: GameDetail;




  //--------------------SearchedGame Tab
  searchedGames: Game[];
  searchInspectedGame: GameDetail;
  searchInput: String;




  //--------------------NewGame Tab
  newGame: Game;
  public gameName = new FormControl('', [Validators.required]);
  public description = new FormControl('', [Validators.required]);



  
  constructor(private gameService: GameService,
              private loginService: LoginService) {
    this.getCurrentUser();
    this.newGame = new Game();
    this.searchInput = "";
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

  inspectGame(clickedGame: Game){
    this.getDetailGame(clickedGame.identifier, true)
  }

  inspectSearchedGame(clickedGame: Game){
    this.getDetailGame(clickedGame.identifier, false)
  }

  search(){
    this.getSearchedGamesName(this.searchInput);
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
            this.joinedGames = games});
  }

  getDetailGame(clickedGameIdentifier: string, inspect: boolean){
    this.gameService.getDetailGame(clickedGameIdentifier)
          .pipe(first()).subscribe(game =>  {
            if(inspect){
              this.inspectedGame = game;
            } else {
              this.searchInspectedGame = game;
            }
          });
  }

  getSearchedGamesName(name: String){
    this.gameService.getSearchName(name.toString())
          .pipe(first()).subscribe(games =>  {
            this.searchedGames = games});
  }

  getSearchedGamesIdentifier(identifier: String){
    this.gameService.getSearchIdentifier(identifier.toString())
          .pipe(first()).subscribe(games =>  {
            this.searchedGames = games});
  }

  postNewGame(newGame: Game){
    this.gameService.startGame(newGame, this.currentUser.identifier)
          .pipe(first()).subscribe(games =>  this.joinedGames = games);
  }



  

}
