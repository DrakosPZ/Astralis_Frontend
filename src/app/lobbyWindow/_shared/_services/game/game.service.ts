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

  getDetailGame(identifier: string): Observable<GameDetail>{
    return this.http.get<GameDetail>(this.searchForDetailIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((gotGames: GameDetail) => this.log(`retrieved Games: w/ ${gotGames}`)),
      catchError(this.handleError<GameDetail>('gotJoinedGames'))
    );
  }

  postJoinGame(identifierG: string, identifierU: string): Observable<Game>{
    const body = {};
      body[identifierG] = identifierU;

      return this.http.post<Game>(this.joinGameURL(), body, this.httpOptions).pipe(
        tap((gotGames: Game) => this.log(`returned Game: w/ ${gotGames}`)),
        catchError(this.handleError<Game>('joinGame'))
      );
  }

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



  startGame(game: Game, identifier: string): Observable<Game[]>{
    const body = 
      new GameUserIDSet({gameLobby: game, userIdentifier: identifier});

    return this.http.post<Game[]>(this.startNewGameURL(), body, this.httpOptions).pipe(
      tap((gotGames: Game[]) => this.log(`returned Game: w/ ${gotGames}`)),
      catchError(this.handleError<Game[]>('startGame'))
    );
  }



  startGameLobby(identifier: string): Observable<GameDetail>{
    return this.http.get<GameDetail>(this.startGameLobbyIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((gotGame: GameDetail) => this.log(`start Game Lobby: w/ ${gotGame}`)),
      catchError(this.handleError<GameDetail>('startGameLobby'))
    );
  }

  saveGameLobby(identifier: string): Observable<boolean>{
    return this.http.get<boolean>(this.storeGameLobbyIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((saved: boolean) => this.log(`saved Game: w/ ${saved}`)),
      catchError(this.handleError<boolean>('saveGameLobby'))
    );
  }

  pauseGameLobby(identifier: string): Observable<GameDetail>{
    return this.http.get<GameDetail>(this.pauseGameLobbyIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((paused: GameDetail) => this.log(`paused Game: w/ ${paused}`)),
      catchError(this.handleError<GameDetail>('pauseGameLobby'))
    );
  }

  stopGameLobby(identifier: string): Observable<GameDetail>{
    return this.http.get<GameDetail>(this.stopGameLobbyIdentifier() + identifier, this.httpOptions)
    .pipe(
      tap((stoped: GameDetail) => this.log(`stoped Game: w/ ${stoped}`)),
      catchError(this.handleError<GameDetail>('stopGameLobby'))
    );
  }

  forwardOpenLobby(): string{
    return this.openGameLobbyIdentifier();
  }

  forwardCloseLobby(): string{
    return this.closeGameLobbyIdentifier();
  }
  
}
