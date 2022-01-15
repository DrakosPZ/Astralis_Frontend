import { Injectable } from "@angular/core";
import { Sprite } from "pixi.js";
import { GameState } from "../../_shared/_models/logicModels/gameState";
import { Ship } from "../../_shared/_models/logicModels/ship";
import { View } from "../displayers/view";
import { F2B_CORRECTION_H, F2B_CORRECTION_W } from "../gameRenderer";

export class ShipDrawer{
  pAppRefrence: any;
  loaderRefrence: any;

  public constructor(
      pAppRefrence: any,
      loaderRefrence: any
    ) {
      this.pAppRefrence = pAppRefrence;
      this.loaderRefrence = loaderRefrence;
  }

  
  public drawState(state: GameState, view: View){
    state.countries.forEach( country => {
        let ship = this.shipsContains(country.ship, view);

        if(typeof ship === 'undefined'){
          ship = this.addNewShipSprite(country.ship, view);
        }

        ship.position.set( country.ship.currentPosition.x + F2B_CORRECTION_W, country.ship.currentPosition.y + F2B_CORRECTION_H );
        
        this.pAppRefrence.stage.addChild(ship);
      });
  }

  private shipsContains(stateShip: Ship, view: View){
      let ship;
      for(let i = 0; i < view.displayedSprites.length; i++){
        if(view.displayedSprites[i].id === stateShip.id){
          ship = view.displayedSprites[i].ship;
          break;
        }
      }
      return ship
  }

  private addNewShipSprite(stateShip: Ship, view: View){
      let shipSprite = new Sprite(this.loaderRefrence.resources["prototypeShip.png"].texture);
      shipSprite.anchor.x = 0.5;
      shipSprite.anchor.y = 0.5;
      view.displayedSprites.push({
        id: stateShip.id, 
        ship: shipSprite
      })
      return shipSprite;
  }
}