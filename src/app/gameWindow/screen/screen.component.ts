import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { LogicGameState } from '../_shared/_models/logicGameState';
import { Loader, Sprite , Application, utils } from 'pixi.js'
import { Ship } from '../_shared/_models/ship';
import { GameRenderer } from '../_shared/_renderers/GameRenderer';
import * as Stomp from '@stomp/stompjs';

const SOCKET_URL = "http://localhost:8080/runningGame";
const GREETING = "/webgamesocket";
const ERROR = "/errors";
const RECEIVING_ENDPOINT = "/topic/reply/";
/**
 * Stomp instance for web sockets.
 */
 const client = new Stomp.Client({
  brokerURL: SOCKET_URL + GREETING,
  /*connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug: function (str) {
    console.log(str);
  },*/
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

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
    this.setUpStompClient();
    
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


    /**
     * Set up Stomp Client
     */
    setUpStompClient(): void{
    
        client.onConnect = function (frame) {
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
        };
      
        client.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        //Hook up to recieving endpoint
        client.subscribe(RECEIVING_ENDPOINT, this.callback);


        client.activate();

    }
    /**
     * send Messages TODO: Filler
     */
    clientSend(): void{
        client.publish({ destination: '/topic/general', body: 'Hello world' });

        // There is an option to skip content length header
        client.publish({
        destination: '/topic/general',
        body: 'Hello world',
        skipContentLengthHeader: true,
        });

        // Additional headers
        client.publish({
        destination: '/topic/general',
        body: 'Hello world',
        headers: { priority: '9' },
        });
    }

    /**
     * handle recieved messages TODO: Add implementation
     */
    callback = function (message) {
            if (message.body) {
                alert('got message with body ' + message.body);
            } else {
                alert('got empty message');
            }
        };
    
}
