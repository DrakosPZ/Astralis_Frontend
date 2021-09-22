import { Component, HostListener, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { GameDetail } from 'src/app/lobbyWindow/_shared/_models/details/gameDetail';
import { findInArray, Game, turnDetailIntoSimple } from 'src/app/lobbyWindow/_shared/_models/game';
import { User } from 'src/app/lobbyWindow/_shared/_models/user';
import { GameService } from 'src/app/lobbyWindow/_shared/_services/game/game.service';
import { LoginService } from 'src/app/lobbyWindow/_shared/_services/login/login.service';
import { GameStatus } from 'src/app/_shared/_models/gameStatus';

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

  /**
   * Method to contain custom component initialization behaviour
   */
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

  //TODO: Add Documentation
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

  //TODO: Add Documentation
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
  //TODO: Add Documentation
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
  //TODO: Add Documentation
  callForJoinedGames(){
    this.getJoinedGames(this.currentUser.identifier)
  }

  //TODO: Add Documentation
  inspectGame(clickedGame: Game){
    this.getDetailGame(clickedGame.identifier, true)
  }

  //TODO: Add Documentation
  inspectSearchedGame(clickedGame: Game){
    this.getDetailGame(clickedGame.identifier, false)
  }

  //TODO: Add Documentation
  search(){
    this.getSearchedGamesName(this.searchInput);
  }

  //TODO: Add Documentation
  userInGame(pickedGame: Game): boolean{
    let inGame = false;
    pickedGame.userGameLobbies.forEach(
      connection => {
        if(connection.user === this.currentUser.identifier){
          inGame = true;
        }
      }
    )
    return inGame;
  }
  
  //TODO: Add Documentation
  callJoinGame(clickedGame: Game, inspect: boolean){
    this.joinGame(clickedGame.identifier, this.currentUser.identifier, inspect);
  }
  
  //TODO: Add Documentation
  callLeaveGame(clickedGame: Game, inspect: boolean){
    this.leaveGame(clickedGame.identifier, this.currentUser.identifier, inspect);
  }

  //TODO: Add Documentation
  callStartGame(clickedGame: Game, inspect: boolean){
    this.startGame(clickedGame.identifier, inspect);
  }

  //TODO: Add Documentation
  callSaveGame(clickedGame: Game, inspect: boolean){
    this.saveGame(clickedGame.identifier, inspect);
  }

  //TODO: Add Documentation
  callPauseGame(clickedGame: Game, inspect: boolean){
    this.pauseGame(clickedGame.identifier, inspect);
  }

  //TODO: Add Documentation
  callCloseGame(clickedGame: Game, inspect: boolean){
    this.stopGame(clickedGame.identifier, inspect);
  }

  //TODO: Add Documentation
  calledByEditScreen(text: String){
    switch (text) {
      case "resetGame":
        this.prepNewGame();
        break;
      case "createGame":
        this.startNewGame();
        break;
    }
  }

  //TODO: Add Documentation
  calledByDetailScreen(text: String, inspect: boolean){
    let useddetailGame: Game;
    if(inspect){
      useddetailGame = turnDetailIntoSimple(this.inspectedGame);
    } else {
      useddetailGame = turnDetailIntoSimple(this.searchInspectedGame);
    }

    switch (text) {
      case "start":
        this.callStartGame(useddetailGame, inspect);
        break;
      case "save":
        this.callSaveGame(useddetailGame, inspect);
        break;
      case "pause":
        this.callPauseGame(useddetailGame, inspect);
        break;
      case "close":
        this.callCloseGame(useddetailGame, inspect);
        break;
      case "load":
        this.openGamePopout(useddetailGame);
        break;
      case "join":
        this.callJoinGame(useddetailGame, inspect);
        break;
      case "leave":
        this.callLeaveGame(useddetailGame, inspect);
        break;
    }
  }

  //TODO: Add Documentation
  prepNewGame(){
    this.newGame = new Game();
    this.newGame.status = GameStatus.UNINITIALIZED;
  }
  
  //TODO: Add Documentation
  startNewGame(){
    this.postNewGame(this.newGame);
  }

  //TODO: Add Documentation
  openGamePopout(game: Game) {
    window.open("Game/" + this.currentUser.identifier + "&" + game.identifier + "&" + this.removeBearerFromToken(this.loginService.getToken()), "_blank")
  }





  

  //--------------------Service Methods
  //TODO: Add Documentation
  getJoinedGames(uIdentifier: string){
    this.gameService.getJoinedGames(uIdentifier)
          .pipe(first()).subscribe(games =>  {
            if(!games){
              games = new Array;
            }
            this.joinedGames = games;
          });
  }

  //TODO: Add Documentation
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

  //TODO: Add Documentation
  getSearchedGamesName(name: String){
    this.gameService.getSearchName(name.toString())
          .pipe(first()).subscribe(games =>  {
            if(!games){
              games = new Array;
            }
            this.searchedGames = games;
          });
  }

  //TODO: Add Documentation
  getSearchedGamesIdentifier(identifier: String){
    this.gameService.getSearchIdentifier(identifier.toString())
          .pipe(first()).subscribe(games =>  {
            if(!games){
              games = new Array;
            }
            this.searchedGames = games;
          });
  }

  //TODO: Add Documentation
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

  //TODO: Add Documentation
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

  //TODO: Add Documentation
  startGame(identifier: String, inspect: boolean){
    this.gameService.startGameLobby(identifier.toString())
          .pipe(first()).subscribe(game => {
            if(inspect){
              this.inspectedGame = game;
            } else {
              this.searchInspectedGame = game;
            }
          });
  }

  //TODO: Add Documentation
  saveGame(identifier: String, inspect: boolean){
    this.gameService.saveGameLobby(identifier.toString())
    .pipe(first()).subscribe(returned => {
      console.log("GameStorage returned " + returned)
      console.log("Maybe Add Message to tell if Game was Stored or not");
    });
  }

  //TODO: Add Documentation
  pauseGame(identifier: String, inspect: boolean){
    this.gameService.pauseGameLobby(identifier.toString())
    .pipe(first()).subscribe(game => {
      if(inspect){
        this.inspectedGame = game;
      } else {
        this.searchInspectedGame = game;
      }
    });
  }

  //TODO: Add Documentation
  stopGame(identifier: String, inspect: boolean){
    this.gameService.stopGameLobby(identifier.toString())
    .pipe(first()).subscribe(game => {
      if(inspect){
        this.inspectedGame = game;
      } else {
        this.searchInspectedGame = game;
      }
    });
  }

  //TODO: Add Documentation
  postNewGame(newGame: Game){
    this.gameService.startGame(newGame, this.currentUser.identifier)
          .pipe(first()).subscribe(games =>  this.joinedGames = games);
  }

  //TODO: Add Documentation
  removeBearerFromToken(rawText: string): string{
    return rawText.substr(rawText.indexOf(" ") + 1);
  }


  

}
