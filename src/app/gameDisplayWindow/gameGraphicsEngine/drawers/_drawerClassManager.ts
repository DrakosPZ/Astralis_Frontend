import { Injectable } from "@angular/core";
import { GameState } from "../../_shared/_models/logicModels/gameState";
import { GameRenderer } from "../gameRenderer";
import { ShipDrawer } from "./shipDrawer";

export class DrawerClassManager{

  private parent: GameRenderer
  private displayedGameStateRefrence: GameState;


  shipDrawer: ShipDrawer;

  public constructor(parent: GameRenderer) {
    this.parent = parent;
    this.displayedGameStateRefrence = parent.displayedGameState;
    this.initDrawerClassManager(parent.pApp, parent.loader);
  }

  public initDrawerClassManager(
    pAppRefrence: any,
    loaderRefrence: any
  ){
    this.shipDrawer = new ShipDrawer(pAppRefrence, loaderRefrence);
  }

  drawState(){
    //Check with ViewHandler which Views are currently opened
    //Accodringly call respective DrawerClasses
    const shipView = this.parent.viewHandler.getOpenedViews()[0];
    this.shipDrawer.drawState(this.displayedGameStateRefrence, shipView);
  }
}