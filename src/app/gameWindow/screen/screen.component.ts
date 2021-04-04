import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { LogicGameState } from '../_shared/_models/logicGameState';
import { Loader, Sprite , Application, utils } from 'pixi.js'
import { Ship } from '../_shared/_models/ship';
import { GameRenderer } from '../_shared/_renderers/GameRenderer';

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


  constructor(
    private gameService: GameService,
    private gameRenderer: GameRenderer,
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
    this.gameRenderer.init(this.pixiContainer);
    
    this.getGameData();
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
      this.gameRenderer.drawState(this.gameState)
    });
  }
}
