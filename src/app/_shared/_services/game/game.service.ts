import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameUserIDSet } from '../../_models/dataHolders/GameUserIDSet';
import { Game } from '../../_models/game';
import { UniversalService } from '../_universal/universal.service';
import { tap, map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService extends UniversalService{

  constructor(
    private http: HttpClient) { 
      super();
  }

  getJoinedGames(identifier: string): Observable<Game[]>{
    return this.http.get<Game[]>(this.gameURL(), this.httpOptions)
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
