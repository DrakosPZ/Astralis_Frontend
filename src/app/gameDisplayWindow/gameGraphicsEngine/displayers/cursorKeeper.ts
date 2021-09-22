import { Injectable } from "@angular/core";
import { ScreenComponent } from "../../screen/screen.component";
import { Position } from "../../_shared/_models/logicModels/position";


@Injectable({
    providedIn: 'root'
  })
  export class CursorKeeper{
      private posX: number;
      private posY: number;
      private screen: ScreenComponent;

      //TODO: Add Documentation to classes once properly implemented

      public setUp(screen: ScreenComponent){
        this.screen = screen;
      }

      public getCurrentPosition(): Position{
        return new Position({x: this.posX, y: this.posY})
      }
      
      public setCurrentPosition(x: number, y: number){
        this.posX = x;
        this.posY = y;

        //console.log("Cursor moved to: " + this.posX + " ; " + this.posY);
      }

      public cursorClicked(){
        this.screen.moveShip(this.getCurrentPosition());
      }
  }