import { Injectable } from "@angular/core";
import { View } from "./view";
import { ViewType } from "./viewType";

export class ViewHandler{
  private views: View[];

  public constructor() {
    this.initViewHandler();
  }

  public initViewHandler(){
    this.views = [];
    this.views.push(new View({viewType: ViewType.SystemScreen, displayed: true}));
  }

  public getOpenedViews(): View[]{
    return this.views.filter((view: View) => view.displayed);
  }

  public openView(viewType: ViewType){
    let view = this.views.filter((view: View) => view.viewType === viewType)[0];
    view.displayed = true;
  }

  public closeView(viewType: ViewType){
    let view = this.views.filter((view: View) => view.viewType === viewType)[0];
    view.displayed = false;
  }
}