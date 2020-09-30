import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameUserIDSet } from '../../_models/dataHolders/GameUserIDSet';
import { Game } from '../../_models/game';
import { UniversalService } from '../_universal/universal.service';
import { tap, map, filter, catchError, mergeMap } from 'rxjs/operators';
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
        return data._embedded.gameStateDTOList as Game[];
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
        return data._embedded.gameStateDTOList as Game[];
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
        return data._embedded.gameStateDTOList as Game[];
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

  startGame(game: Game, identifier: string): Observable<Game[]>{
    const body = 
      new GameUserIDSet({gameState: game, userIdentifier: identifier});

    return this.http.post<Game[]>(this.startNewGameURL(), body, this.httpOptions).pipe(
      tap((gotGames: Game[]) => this.log(`returned Game: w/ ${gotGames}`)),
      catchError(this.handleError<Game[]>('startGame'))
    );
  }

  /*searchForGame(): Observable<Game[]>{

  }*/
}
