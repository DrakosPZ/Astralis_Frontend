import { Injectable } from "@angular/core";
import { Loader, Sprite , Application } from 'pixi.js'
import { LogicGameState } from "../_models/logicGameState";
import { Ship } from '../_models/ship';

@Injectable({
    providedIn: 'root'
  })
  export class GameRenderer{
    private pApp: any;
    loader = new Loader("assets/_gameAssets/");
    ships: {id, ship}[] = new Array();

    public init(htmlContainer: any): Application{
        this.pApp = new Application({ width: 1000, height: 1000 });
        htmlContainer.nativeElement.appendChild(this.pApp.view);

        this.loader
          .add("prototypeShip.png")
          .load(setup);
        function setup() {
          console.log("Texture Load Completed");
        }
        return this.pApp;
    }


    public drawState(state: LogicGameState){
        state.countries.forEach( country => {
            let ship = this.shipsContains(country.ship);

            if(typeof ship === 'undefined'){
                ship = this.addNewShipSprite(country.ship);
            }
    
            ship.position.set( country.ship.currentPosition.x + 500, country.ship.currentPosition.y + 500 );
            
            this.pApp.stage.addChild(ship);
          });
    }

    private shipsContains(stateShip: Ship){
        let ship;
        for(let i = 0; i < this.ships.length; i++){
            console.log("check if present");
            console.log(this.ships[i]);
            console.log(stateShip);
            if(this.ships[i].id === stateShip.id){
              ship = this.ships[i].ship;
              break;
            }
          }
        return ship
    }

    private addNewShipSprite(stateShip: Ship){
        let ship = new Sprite(this.loader.resources["prototypeShip.png"].texture);
        ship.anchor.x = 0.5;
        ship.anchor.y = 0.5;
        this.ships.push({
            id: stateShip.id, 
            ship: ship
            })
        return ship;
    }
    
  }