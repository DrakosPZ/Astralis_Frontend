import { Injectable } from "@angular/core";
import { GameState } from "../../_shared/_models/logicModels/gameState";

@Injectable({
    providedIn: 'root'
  })
export class GameStateDecipherer{
  
  /**
   * Method currently doesn't do anything, for this to work vision/knowledge has to be reworked on the BE
   * 
   * @param gameState 
   * @returns 
   */
  decipherGameState(gameState: GameState): GameState{
    return gameState;
  }
}


  /**
   * Method currently doesn't do anything, for this to work vision/knowledge has to be reworked on the BE
   * 
   * @param gameState 
   * @returns 
   */
   export const decipherGameState = (gameState: GameState): GameState =>{
    return gameState;
  }