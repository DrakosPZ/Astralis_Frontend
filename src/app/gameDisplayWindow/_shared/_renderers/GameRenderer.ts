import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { Loader, Sprite , Application, Graphics } from 'pixi.js'
import { GameState } from "../_models/logicModels/gameState";
import { Ship } from '../_models/logicModels/ship';
import { CursorKeeper } from "./CursorKeeper";

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 1000;
//Everything going from the frontend to backend has to be corrected -
//Everything going from the backend to frontend has to be corrected +
const F2B_CORRECTION_W = VIEW_WIDTH / 2;
const F2B_CORRECTION_H = VIEW_HEIGHT / 2;

@Injectable({
    providedIn: 'root'
  })
  export class GameRenderer{
    private pApp: any;
    private cursor: CursorKeeper;

    loader = new Loader("assets/_gameAssets/");
    ships: {id, ship}[] = new Array();

    public init(
      htmlContainer: any, 
      cursorKeeper: CursorKeeper
                                ): Application{
        this.cursor = cursorKeeper;
        this.pApp = new Application({ 
          width: VIEW_WIDTH, height: VIEW_HEIGHT 
        });
        htmlContainer.nativeElement.appendChild(this.pApp.view);

        this.loader
          .add("prototypeShip.png")
          .load(setup);
        function setup() {
          console.log("Texture Load Completed");
        }
        this.stageSetup();
        this.initMouseInteraction();
        return this.pApp;
    }

    private stageSetup(){
      let bg = new Graphics();
      bg.beginFill(0x66CCFF);
      bg.drawRect(
        0, 
        0, 
        this.pApp.screen.width, 
        this.pApp.screen.height);
      bg.endFill();
      // Tint it to whatever color you want, here red
      bg.tint = 0xff0000;
      // Add a click handler
      bg.interactive = true;
      // Add it to the stage as the first object
      this.pApp.stage.addChild(bg);
    }

    private initMouseInteraction(){
      this.pApp.stage.interactive = true;
      this.pApp.stage.on("pointermove", () => this.moveCursor());
      //this.pApp.stage.on("mousedown", () => {console.log("mousedown")});
      //this.pApp.stage.on("rightdown", () => {console.log("rightdown")});
      //this.pApp.stage.on("mouseup", () => {console.log("mouseup")});
      //this.pApp.stage.on("rightup", () => {console.log("rightup")});
      //this.pApp.stage.on("click", () => {console.log("click")});
      //this.pApp.stage.on("rightclick", () => {console.log("rightclick")});
      this.pApp.stage.on("pointerdown", () => this.clickCursor());
      //this.pApp.stage.on("pointerup", () => {console.log("pointerup")});
      //this.pApp.stage.on("pointertap", () => {console.log("pointertap")});
    }

    private moveCursor(){
      let pos = 
        this.pApp.renderer.plugins.interaction.mouse.global;
      this.cursor.setCurrentPosition(pos.x - F2B_CORRECTION_W, pos.y - F2B_CORRECTION_H);
    }

    private clickCursor(){
      this.cursor.cursorClicked();
    }

    /**
     * CleanUp entire Stage and all loaded textures
     */
    public cleanUp(){
      this.pApp.destroy(true, true);
    }



    public drawState(state: GameState){
        state.countries.forEach( country => {
            let ship = this.shipsContains(country.ship);

            if(typeof ship === 'undefined'){
                ship = this.addNewShipSprite(country.ship);
            }
    
            ship.position.set( country.ship.currentPosition.x + F2B_CORRECTION_W, country.ship.currentPosition.y + F2B_CORRECTION_H );
            
            this.pApp.stage.addChild(ship);
          });
    }

    private shipsContains(stateShip: Ship){
        let ship;
        for(let i = 0; i < this.ships.length; i++){
            //console.log("check if present");
            //console.log(this.ships[i]);
            //console.log(stateShip);
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