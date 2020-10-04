import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { GameDetail } from 'src/app/_shared/_models/details/gameDetail';
import { findInArray, Game } from 'src/app/_shared/_models/game';
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
  joinedGames: Game[] = new Array();
  inspectedGame: GameDetail;




  //--------------------SearchedGame Tab
  searchedGames: Game[] = new Array()
  searchInspectedGame: GameDetail;
  searchInput: String;




  //--------------------NewGame Tab
  newGame: Game;



  
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

  replaceGameInArrays(newer: Game){
    if(this.joinedGames){
      let index = findInArray(newer, this.joinedGames);
      this.joinedGames.splice(index, 1, newer);
    }
    if(this.searchedGames){
      let index = findInArray(newer, this.searchedGames);
      this.searchedGames.splice(index, 1, newer);
    }
  }

  reloadArrays(inspect: boolean){
    if(inspect){
      this.callForJoinedGames();
      this.inspectedGame = null;
    } else {
      this.search();
      this.searchInspectedGame = null;
    }
  }






  //--------------------Mat Tab Method
  
  checkForTab(event){
    switch (event.index) {
      case 0:
        this.callForJoinedGames();
        break;
      case 1:
        this.getSearchedGamesName(this.searchInput);
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

  userInGame(pickedGame: Game): boolean{
    let inGame = false;
    pickedGame.userGameStates.forEach(
      connection => {
        if(connection.user === this.currentUser.identifier){
          inGame = true;
        }
      }
    )
    return inGame;
  }
  
  callJoinGame(clickedGame: Game, inspect: boolean){
    this.joinGame(clickedGame.identifier, this.currentUser.identifier, inspect);
  }
  
  callLeaveGame(clickedGame: Game, inspect: boolean){
    this.leaveGame(clickedGame.identifier, this.currentUser.identifier, inspect);
  }
  
  prepNewGame(){
    this.newGame = new Game();
  }
  
  startNewGame(){
    this.postNewGame(this.newGame);
  }




  

  //--------------------Service Methods
  getJoinedGames(uIdentifier: string){
    this.gameService.getJoinedGames(uIdentifier)
          .pipe(first()).subscribe(games =>  {
            if(!games){
              games = new Array;
            }
            this.joinedGames = games;
          });
  }

  getDetailGame(clickedGameIdentifier: string, inspect: boolean){
    this.gameService.getDetailGame(clickedGameIdentifier)
          .pipe(first()).subscribe(game =>  {
            if(!game){
              game = new GameDetail();
            }
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
            if(!games){
              games = new Array;
            }
            this.searchedGames = games;
          });
  }

  getSearchedGamesIdentifier(identifier: String){
    this.gameService.getSearchIdentifier(identifier.toString())
          .pipe(first()).subscribe(games =>  {
            if(!games){
              games = new Array;
            }
            this.searchedGames = games;
          });
  }

  joinGame(identifierG: String, identifierU: String, inspect: boolean){
    this.gameService.postJoinGame(identifierG.toString(), 
                                  identifierU.toString())
          .pipe(first()).subscribe(game =>  {
              if(game.identifier == ""){
                this.reloadArrays(inspect);
              } else {
                this.replaceGameInArrays(game);
                this.getDetailGame(game.identifier, inspect);
              }
            });
  }

  leaveGame(identifierG: String, identifierU: String, inspect: boolean){
    this.gameService.postLeaveGame(identifierG.toString(), 
                                   identifierU.toString())
          .pipe(first()).subscribe(game =>  {
            if(game.identifier == ""){
              this.reloadArrays(inspect);
            } else {
              this.replaceGameInArrays(game);
              this.getDetailGame(game.identifier, inspect);
            }
          });
  }

  postNewGame(newGame: Game){
    this.gameService.startGame(newGame, this.currentUser.identifier)
          .pipe(first()).subscribe(games =>  this.joinedGames = games);
  }



  

}
