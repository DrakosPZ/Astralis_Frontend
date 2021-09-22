import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameUserIDSet } from '../../_models/dataHolders/GameUserIDSet';
import { Game } from '../../_models/game';
import { UniversalService } from '../_universal/universal.service';
import { tap, map, catchError } from 'rxjs/operators';
import { GameDetail } from '../../_models/details/gameDetail';

@Injectable({
  providedIn: 'root'
})
export class GameService extends UniversalService{

  constructor(
    private http: HttpClient) { 
      super();
  }

  /**
   * Generates a HTTP request and sends it to the backend to retrieve a list of all gameLobbies the user joined in.
   * 
   * @param identifier The Identifier of the user connected to the game lobbies
   * @returns An observable with the looked for GameLobbies list if succesfull, otherwhise throws Exception.
   */
  getJoinedGames(identifier: string): Observable<Game[]>{
    return this.http.get<Game[]>(this.joinedGamesURL() + identifier, this.httpOptions)
    .pipe(
      map((data: any) => {
        return data._embedded.gameLobbyDTOList as Game[];
      })
    )
    .pipe(
      tap((gotGames: Game[]) => this.log(`retrieved Games: w/ ${gotGames}`)),
      catchError(this.handleError<Game[]>('gotJoinedGames'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to retrieve a game/games based on a looked for name.
   * 
   * @param name The text looked for.
   * @returns An observable with the looked for GameLobbies list if succesfull, otherwhise throws Exception.
   */
  getSearchName(name: string): Observable<Game[]>{
    return this.http.get<Game[]>(this.searchForNameURL() + name, this.httpOptions)
    .pipe(
      map((data: any) => {
        console.log(data);
        return data._embedded.gameLobbyDTOList as Game[];
      })
    )
    .pipe(
      tap((gotGames: Game[]) => this.log(`retrieved Games: w/ ${gotGames}`)),
      catchError(this.handleError<Game[]>('gotJoinedGames'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to retrieve a game/games based on a looked for gamesIdentifier.
   * 
   * @param identifier The identifier of the looked for games.
   * @returns An observable with the looked for GameLobbies list if succesfull, otherwhise throws Exception.
   */
  getSearchIdentifier(identifier: string): Observable<Game[]>{
    return this.http.get<Game[]>(this.searchForIdentifierURL() + identifier, this.httpOptions)
    .pipe(
      map((data: any) => {
        console.log(data);
        return data._embedded.gameLobbyDTOList as Game[];
      })
    )
    .pipe(
      tap((gotGames: Game[]) => this.log(`retrieved Games: w/ ${gotGames}`)),
      catchError(this.handleError<Game[]>('gotJoinedGames'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to retrieve a game with all of the detailed information 
   * so no further requests for those have to be send out based on a looked for gameIdentifier.
   * 
   * @param identifier The identifier of the looked for game.
   * @returns An observable with the looked for GameLobbyDetail if succesfull, otherwhise throws Exception.
   */
  getDetailGame(identifier: string): Observable<GameDetail>{
    return this.http.get<GameDetail>(this.searchForDetailIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((gotGames: GameDetail) => this.log(`retrieved Games: w/ ${gotGames}`)),
      catchError(this.handleError<GameDetail>('gotJoinedGames'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to join a gameLobby as a user.
   * 
   * @param identifierG The identifier of the to be joined game.
   * @param identifierU The identifier of the to be joined user.
   * @returns An observable with the joined for GameLobby if succesfull, otherwhise throws Exception.
   */
  postJoinGame(identifierG: string, identifierU: string): Observable<Game>{
    const body = {};
      body[identifierG] = identifierU;

      return this.http.post<Game>(this.joinGameURL(), body, this.httpOptions).pipe(
        tap((gotGames: Game) => this.log(`returned Game: w/ ${gotGames}`)),
        catchError(this.handleError<Game>('joinGame'))
      );
  }

  /**
   * Generates a HTTP request and sends it to the backend to leave a gameLobby as a user.
   * 
   * @param identifierG The identifier of the to be left game.
   * @param identifierU The identifier of the to be leaving user.
   * @returns An observable with the left for GameLobby if succesfull, otherwhise throws Exception.
   */
  postLeaveGame(identifierG: string, identifierU: string): Observable<Game>{
    const body = {};
      body[identifierG] = identifierU;

      console.log("Leave Game");
      console.log(body);
      return this.http.post<Game>(this.leaveGameURL(), body, this.httpOptions).pipe(
        tap((gotGames: Game) => this.log(`returned Game: w/ ${gotGames}`)),
        catchError(this.handleError<Game>('leaveGame'))
      );
  }



  /**
   * Generates a HTTP request and sends it to the backend to create a new GameLobby
   * 
   * @param game The gameLobby object to be created.
   * @param identifier The identifier of the user creating the gameLobby.
   * @returns An observable with the created GameLobby if succesfull, otherwhise throws Exception.
   */
  startGame(game: Game, identifier: string): Observable<Game[]>{
    const body = 
      new GameUserIDSet({gameLobby: game, userIdentifier: identifier});

    return this.http.post<Game[]>(this.startNewGameURL(), body, this.httpOptions).pipe(
      tap((gotGames: Game[]) => this.log(`returned Game: w/ ${gotGames}`)),
      catchError(this.handleError<Game[]>('startGame'))
    );
  }



  /**
   * Generates a HTTP request and sends it to the backend to start the gameLoop in a gameLobby.
   * 
   * @param identifier The identifier of the gamelobby to be started.
   * @returns An observable with the updated GameLobby if succesfull, otherwhise throws Exception.
   */
  startGameLobby(identifier: string): Observable<GameDetail>{
    return this.http.get<GameDetail>(this.startGameLobbyIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((gotGame: GameDetail) => this.log(`start Game Lobby: w/ ${gotGame}`)),
      catchError(this.handleError<GameDetail>('startGameLobby'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to save the gameLoop in a gameLobby.
   * 
   * @param identifier The identifier of the gamelobby to be saved.
   * @returns An observable with the updated GameLobby if succesfull, otherwhise throws Exception.
   */
  saveGameLobby(identifier: string): Observable<boolean>{
    return this.http.get<boolean>(this.storeGameLobbyIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((saved: boolean) => this.log(`saved Game: w/ ${saved}`)),
      catchError(this.handleError<boolean>('saveGameLobby'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to pause the gameLoop in a gameLobby.
   * 
   * @param identifier The identifier of the gamelobby to be pauseed.
   * @returns An observable with the updated GameLobby if succesfull, otherwhise throws Exception.
   */
  pauseGameLobby(identifier: string): Observable<GameDetail>{
    return this.http.get<GameDetail>(this.pauseGameLobbyIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((paused: GameDetail) => this.log(`paused Game: w/ ${paused}`)),
      catchError(this.handleError<GameDetail>('pauseGameLobby'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to stop the gameLoop in a gameLobby.
   * 
   * @param identifier The identifier of the gamelobby to be stopped.
   * @returns An observable with the updated GameLobby if succesfull, otherwhise throws Exception.
   */
  stopGameLobby(identifier: string): Observable<GameDetail>{
    return this.http.get<GameDetail>(this.stopGameLobbyIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((stoped: GameDetail) => this.log(`stoped Game: w/ ${stoped}`)),
      catchError(this.handleError<GameDetail>('stopGameLobby'))
    );
  }



  //TODO: Test if this is still needed? it doesn't show anywhere so remove it?
  forwardOpenLobby(): string{
    return this.openGameLobbyIdentifier();
  }

  //TODO: Test if this is still needed? it doesn't show anywhere so remove it?
  forwardCloseLobby(): string{
    return this.closeGameLobbyIdentifier();
  }
  
}
