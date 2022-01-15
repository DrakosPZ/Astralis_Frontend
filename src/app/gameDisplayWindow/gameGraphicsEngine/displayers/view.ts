import { Injectable } from "@angular/core";
import { ViewType } from "./viewType";

export class View{
  displayedSprites: any[] = new Array();
  viewType: ViewType;
  displayed: boolean = false;
  
  public constructor(init?:Partial<View>) {
    Object.assign(this, init);
  }

}