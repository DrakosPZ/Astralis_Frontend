import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

//ALL THE URLS USED TO COMMUNICATE WITH THE BACKEND
const HTTP_URL ="http://";
const START_URL = "localhost:8080";
const IDENTIFIER_URL = "?identifier=";
const NAME_URL = "?name=";

const USER_URL = "/user";
const REGISTRATION_URL = "/registration";

const USERNAME_URL = "?username=";
const LOGIN = "/login";
const LOGOUT = "/logout";
const AFTER_LOGIN = "/afterLogin";

const GAME_URL = "/gamelobby";
const JOINEDGAME_URL = "/joinedGame";
const STARTGAME_URL = "/createNewGame";
const STARTGAMELOBBY_URL = "/startGame";
const PAUSEGAMELOBBY_URL = "/pauseGame";
const STOREGAMELOBBY_URL = "/storeGame";
const STOPGAMELOBBY_URL = "/stopGame";
const OPENGAMELOBBY_URL = "/joinGame";
const CLOSEGAMELOBBY_URL = "/leaveGame";
const JOINGAME_URL = "/addUser";
const LEAVEGAME_URL = "/removeUser";
const SEARCHFOR_URL = "/searchFor";
const DETAILFOR_URL = "/detailsFor";

@Injectable({
  providedIn: 'root'
})
export class UniversalService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor() { }

  /**
   * Used to set the communication type to HTTP
   */
  protected jsonHttpOption(): {}{
    return this.httpOptions;
  }







  //-----------------------------------------User Related URLs
  /**
   * Gets the URL to the user API
   * 
   * @returns the UserAPIUrl string
   */
  protected userURL(): string{
    return HTTP_URL+START_URL+USER_URL;
  }  
  
  /**
   * Extends the user URL with the Get By Identifiert Part
   * 
   * @returns the UserAPIUrl + identifiert request param part.
   */
  protected userByIdentifierURL(): string{
    return this.userURL()+IDENTIFIER_URL;
  }

  /**
   * Extends the user URL with the delete by identifier part
   * 
   * @returns the UserAPIUrl + identifier request param part.
   */
  protected deleteUserURL(): string{
    return this.userURL()+IDENTIFIER_URL;
  }

  /**
   * Extends the user URL with the registration part
   * 
   * @returns the UserAPIUrl + registration request param part.
   */
  protected registerUserURL(): string{
    return this.userURL()+REGISTRATION_URL;
  }







  
  //-----------------------------------------Authentication Related URLs
  /**
   * Gets the URL to the logout route
   * 
   * @returns the PersonAPIUrl + LogoutRoute string
   */
  protected logoutRoute(): string{
    return this.userURL()+LOGOUT;
  }

  /**
   * Gets the URL to the login route
   * 
   * @returns the PersonAPIUrl + LoginRoute string
   */
  protected loginRoute(): string{
    return this.userURL()+LOGIN;
  }

  /**
   * Gets the URL to the after login route
   * 
   * @returns the PersonAPIUrl + AfterLoginRoute string
   */
  protected loginGetUserRoute(): string{
    return this.userURL()+AFTER_LOGIN;
  }

  /**
   * Extends the user URL with the Get by username part
   * 
   * @returns the UserAPIUrl + username request param part.
   */
  protected userByUsernameURL(): string{
    return this.userURL()+USERNAME_URL;
  }







  //-----------------------------------------Game Lobby Related URLs
   /**
   * Gets the URL to the game API
   * 
   * @returns the GameAPIUrl string
   */
  protected gameURL(): string{
    return HTTP_URL+START_URL+GAME_URL;
  }  
  
   /**
   * Gets the URL to the game API with the Joined Game Part and identifier param
   * 
   * @returns the GameAPIUrl + JoinedGames + identifier string
   */
  protected joinedGamesURL(): string{
    return this.gameURL()+JOINEDGAME_URL+IDENTIFIER_URL;
  }  
  
  /**
  * Gets the URL to the game API with the create new Game Part
  * 
  * @returns the GameAPIUrl + StartNewGame string
  */
 protected startNewGameURL(): string{
   return this.gameURL()+STARTGAME_URL;
 }  
  
  
  /**
  * Gets the URL to the game API with the join Game Part
  * 
  * @returns the GameAPIUrl + JoinGame
  */
 protected joinGameURL(): string{
   return this.gameURL()+JOINGAME_URL;
 }  
  
 /**
  * Gets the URL to the game API with the leave Game Part
  * 
  * @returns the GameAPIUrl + LeaveGame
 */
protected leaveGameURL(): string{
  return this.gameURL()+LEAVEGAME_URL;
}  
  
  
/**
 * Gets the URL to the game API with the Search and Name Part
 * 
 * @returns the GameAPIUrl + SearchFor + ?Name
*/
protected searchForNameURL(): string{
 return this.gameURL()+SEARCHFOR_URL+NAME_URL;
}  
  
/**
 * Gets the URL to the game API with the Search and Identifier Part
 * 
 * @returns the GameAPIUrl + SearchFor + ?Identifier
*/
protected searchForIdentifierURL(): string{
 return this.gameURL()+SEARCHFOR_URL+IDENTIFIER_URL;
}  
  
/**
 * Gets the URL to the game API with the Detail Search and Identifier Part
 * 
 * @returns the GameAPIUrl + DetailFor + ?Identifier
*/
protected searchForDetailIdentifier(): string{
 return this.gameURL()+DETAILFOR_URL+IDENTIFIER_URL;
}  
  




/**
 * Gets the URL to the game API with the Start Game Lobby and Identifier Part
 * 
 * @returns the GameAPIUrl + StartGameLobby + ?Identifier
*/
protected startGameLobbyIdentifier(): string{
 return this.gameURL()+STARTGAMELOBBY_URL+IDENTIFIER_URL;
}  
  
/**
 * Gets the URL to the game API with the Pause Game Lobby and Identifier Part
 * 
 * @returns the GameAPIUrl + PauseGameLobby + ?Identifier
*/
protected pauseGameLobbyIdentifier(): string{
  console.error("pauseGameLobbyIdentifier Route not yet implemented")
 return this.gameURL()+PAUSEGAMELOBBY_URL+IDENTIFIER_URL;
}  

/**
 * Gets the URL to the game API with the Store Game Lobby and Identifier Part
 * 
 * @returns the GameAPIUrl + StoreGameLobby + ?Identifier
*/
protected storeGameLobbyIdentifier(): string{
 return this.gameURL()+STOREGAMELOBBY_URL+IDENTIFIER_URL;
}  
  
/**
 * Gets the URL to the game API with the Stop Game Lobby and Identifier Part
 * 
 * @returns the GameAPIUrl + StopGameLobby + ?Identifier
*/
protected stopGameLobbyIdentifier(): string{
 return this.gameURL()+STOPGAMELOBBY_URL+IDENTIFIER_URL;
}  
  
/**
 * Gets the URL to the game API with the Open Game Lobby and Identifier Part
 * 
 * @returns the GameAPIUrl + OpenGameLobby + ?Identifier
*/
protected openGameLobbyIdentifier(): string{
  return this.gameURL()+OPENGAMELOBBY_URL+IDENTIFIER_URL;
}  
  
/**
 * Gets the URL to the game API with the Close Game Lobby and Identifier Part
 * 
 * @returns the GameAPIUrl + CloseGameLobby + ?Identifier
*/
protected closeGameLobbyIdentifier(): string{
 return this.gameURL()+CLOSEGAMELOBBY_URL+IDENTIFIER_URL;
}  







  //-----------------------------------------Error and Console Handling
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  protected log(message: string) {
    console.log(message);
    //this.messageService.add(`HeroService: ${message}`);
  }
  
}