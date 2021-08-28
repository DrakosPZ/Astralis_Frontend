import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogicGameState } from '../_shared/_models/logicGameState';
import { Loader, Sprite , Application, utils } from 'pixi.js'
import { Ship } from '../_shared/_models/ship';
import { GameRenderer } from '../_shared/_renderers/GameRenderer';
import * as Stomp from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import { WebSocketService } from '../_shared/_services/WebsocketService';

const SOCKET_URL = "ws://localhost:8080/runningGame";
const GREETING = "/webgamesocket";
const ERROR = "/errors";
const RECEIVING_ENDPOINT = "/topic/reply/";

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  id: string;
  userID: string;
  gameID: string;

  gameState: LogicGameState;

  @ViewChild('pixiContainer') pixiContainer; // this allows us to reference and load stuff into the div container

  //test i this works
  client: Client;

  constructor(
    private gameRenderer: GameRenderer,
    private route: ActivatedRoute,
    private webSocketAPI: WebSocketService
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
    this.webSocketAPI._setUp(this.gameID);
    this.webSocketAPI.onMessageReceived("").subscribe((message: any) => this.handleMessage(message.body));
  }

  ngOnDestroy(): void{}


  //new Attempt
  disconnect(){
    this.webSocketAPI._disconnect();
  }

  //WebSocket Local Handling Methods
  sendMessage(){
    this.webSocketAPI._send("Connected");
  }

  handleMessage(message){
    try{
      console.log(message);
      //let response = Convert.toChatRoom(message);
      //this.recieveds = response.contents;
    } catch(e){
      console.error(e);
    }
  }
    
}
