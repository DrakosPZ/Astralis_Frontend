import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { LogicGameState } from '../_shared/_models/logicGameState';
import { Loader, Sprite , Application, utils } from 'pixi.js'
import { Ship } from '../_shared/_models/ship';

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
  loader = new Loader(/*"src/assets/_gameAssets/"*/);
  ships: {id, ship}[] = new Array();

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
  }

  ngAfterViewInit(){

    this.getGameData();

    let type = "WebGL";
    if(!utils.isWebGLSupported()){
      type = "canvas";
    }
    utils.sayHello(type);

    //To Test GameDrawing
    this.pApp = new Application({ width: 1000, height: 1000 }); // this creates our pixi application

    this.pixiContainer.nativeElement.appendChild(this.pApp.view); // this places our pixi application onto the viewable document
    
    //load an image and run the `setup` function when it's done
    this.loader
      .add("assets/_gameAssets/prototypeShip.png")
      .load(setup);

    //This `setup` function will run when the image has loaded
    function setup() {
      console.log("Texture Load Completed");
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

      this.gameState.countries.forEach( country => {
        let ship;
        let shipSetFlag = false;

        for(let i = 0; i < this.ships.length; i++){
          console.log("check if present");
          console.log(this.ships[i]);
          console.log(country.ship);
          if(this.ships[i].id === country.ship.id){
            ship = this.ships[i].ship;
            shipSetFlag = true;
            break;
          }
        }
        if(!shipSetFlag){
          ship = new Sprite(this.loader.resources["assets/_gameAssets/prototypeShip.png"].texture);
          ship.anchor.x = 0.5;
          ship.anchor.y = 0.5;
          this.ships.push({
            id: country.ship.id, 
            ship: ship
          })
        }

        ship.position.set( country.ship.currentPosition.x + 500, country.ship.currentPosition.y + 500 );
        
        this.pApp.stage.addChild(ship);
      });
      //ADD REDRAWING OF STATE
    });
  }
}
