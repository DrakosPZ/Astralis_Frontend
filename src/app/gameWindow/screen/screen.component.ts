import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { LogicGameState } from '../_shared/_models/logicGameState';
declare var PIXI: any

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  id: string;
  userID: string;
  gameID: string;

  eventSource = null;
  gameState: LogicGameState;
  @ViewChild('pixiContainer') pixiContainer; // this allows us to reference and load stuff into the div container

  public pApp: any; // this will be our pixi application

  //Aliases
  loader = PIXI.Loader;
  Sprite = PIXI.Sprite;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    ) { 
      this.route.paramMap.subscribe( params => {
        let ids = params.get('ids').split('&')
        this.userID = ids[0];
        this.gameID = ids[1];
      });
    }

  ngOnInit(): void {
    console.log("ngOnInit: ");
    console.log(PIXI);
    console.log(this.loader);
    console.log(this.Sprite);
  }

  ngAfterViewInit(){

    this.getGameData();

    let type = "WebGL";
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas";
    }
    PIXI.utils.sayHello(type);

    //To Test GameDrawing
    this.pApp = new PIXI.Application({ width: 800, height: 600 }); // this creates our pixi application

    this.pixiContainer.nativeElement.appendChild(this.pApp.view); // this places our pixi application onto the viewable document
    
    //load an image and run the `setup` function when it's done
    this.loader
      .add("src/assets/_gameAssets/prototypeShip.png")
      .load(setup);

    //This `setup` function will run when the image has loaded
    function setup() {
      //Create the cat sprite
      let cat = new PIXI.Sprite(this.loader.resources["src/assets/_gameAssets/prototypeShip.png"].texture);

      //Add the cat to the stage
      this.pApp.stage.addChild(cat);
    }
  }

  ngOnDestroy(): void{}

  getGameData(): void {
    //TODO: TAKE CARE OF closing connection when window closed
    this.eventSource = new EventSource(this.gameService.forwardOpenLobby() + this.gameID);
    console.log("CONNECTED SUCCESSFULLY: " + this.eventSource);

    this.eventSource.addEventListener('message', message => {
      this.gameState = JSON.parse(message.data)
      console.log("Recieved Data");
      console.log(this.gameState);
      //ADD REDRAWING OF STATE
    });
  }
}
