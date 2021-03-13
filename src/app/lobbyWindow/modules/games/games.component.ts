import { Component, HostListener, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PopoutService } from 'src/app/gameWindow/_services/PopoutService/popout.service';
import { POPOUT_MODALS } from 'src/app/gameWindow/_services/PopoutService/popout.tokens';
import { GameDetail } from 'src/app/_shared/_models/details/gameDetail';
import { findInArray, Game, turnDetailIntoSimple } from 'src/app/_shared/_models/game';
import { User } from 'src/app/_shared/_models/user';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { LoginService } from 'src/app/_shared/_services/login/login.service';
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
              private loginService: LoginService,
              private popOutService: PopoutService) {
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

  callStartGame(clickedGame: Game, inspect: boolean){
    this.startGame(clickedGame.identifier, inspect);
  }

  callSaveGame(clickedGame: Game, inspect: boolean){
    this.saveGame(clickedGame.identifier, inspect);
  }

  callPauseGame(clickedGame: Game, inspect: boolean){
    this.pauseGame(clickedGame.identifier, inspect);
  }

  callCloseGame(clickedGame: Game, inspect: boolean){
    this.stopGame(clickedGame.identifier, inspect);
  }

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

  prepNewGame(){
    this.newGame = new Game();
    this.newGame.status = GameStatus.UNINITIALIZED;
  }
  
  startNewGame(){
    this.postNewGame(this.newGame);
  }


  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: Event) {
    this.popOutService.closePopoutModal();
  }

  openGamePopout(game: Game) {
    window.open("http://localhost:4200/Game",'_blank')
    //window.open("http://localhost:4200/Game/" + game.identifier,'_blank')
    /*const modalData = {
      game_id: game.identifier,
      user_id: this.currentUser.identifier,
      game_name: game.name
    };
    if (!this.popOutService.isPopoutWindowOpen()) {
      this.popOutService.openPopoutModal(modalData);
    }
    
    //#possibly remove this part once an actual navigation Route compatible solution
    //# is implemented
    setTimeout(() => {
      POPOUT_MODALS['outlet'].detach();
      const injector = this.popOutService.createInjector(modalData);
      const componentInstance = this.popOutService.attachScreenContainer(POPOUT_MODALS['outlet'], injector);
      POPOUT_MODALS['componentInstance'] = componentInstance;
      this.popOutService.focusPopoutWindow();
    }, 100);*/
    
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

  saveGame(identifier: String, inspect: boolean){
    this.gameService.saveGameLobby(identifier.toString())
    .pipe(first()).subscribe(returned => {
      console.log("GameStorage returned " + returned)
      console.log("Maybe Add Message to tell if Game was Stored or not");
    });
  }

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

  postNewGame(newGame: Game){
    this.gameService.startGame(newGame, this.currentUser.identifier)
          .pipe(first()).subscribe(games =>  this.joinedGames = games);
  }



  

}
