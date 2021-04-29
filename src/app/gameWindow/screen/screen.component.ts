import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { LogicGameState } from '../_shared/_models/logicGameState';
import { Loader, Sprite , Application, utils } from 'pixi.js'
import { Ship } from '../_shared/_models/ship';
import { GameRenderer } from '../_shared/_renderers/GameRenderer';
import * as Stomp from 'stompjs';

const SOCKET_URL = "http://localhost:8080/runningGame";
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

  
    /**
     * REPLACE WITH ONE DOCUMENTATION
     * Attempts to connect through web sockets with the server as soon as the initial form with the username is submitted. Further, it also
     * subscribes to the server through the channel containing the socket-id. The server sends a "start" message the first time. From the
     * next steps, it sends the details of the opponent player turn. This is used to color the battle board with appropriate colors. If
     * the game is over, the server also sends that info here. Refer to the processMessageFromClient() api in WebSocketController in the
     * server. A sample response can be of the type:
     *
     * @example
     * To check an example input JSON object, refer to the README tab above.
     */
    connect() {
      const socket = new WebSocket( SOCKET_URL + GREETING );
      this.ws = Stomp.over(socket);
      const that = this;
      this.ws.connect({}, frame => {
          that.ws.subscribe(ERROR, message => {
              alert('Error ' + message.body);
          });
          that.ws.subscribe(RECEIVING_ENDPOINT + this.socketUrl, message => {
              let tempdata;
              let tempUserNameObject;
              if (message.body === 'start') {
                  setTimeout(() => {
                      this.battleService.getPlayer2Id(this.socketUrl).subscribe(
                          data => {
                              tempdata = data;
                              this.opponentUserId = tempdata.userId;
                          }, error1 => {
                              console.error(error1);
                          }, () => {
                                  this.battleService.getUserName(this.opponentUserId).subscribe(data => {
                                      tempUserNameObject = data;
                                  }, error => {
                                      console.error(error);
                                  }, () => {
                                      this.opponentUserName = tempUserNameObject.userName;
                                  });
                          });
                      }, 1500);

              } else {
                  const stringInfo = JSON.parse(message.body);
                  if (stringInfo.turnBy == 'p1') {
                      if (stringInfo.isContainsShip == 'true') {
                          this.ourTurn = false;
                          BattleboardComponent.highlightCells(['their' + stringInfo.attackedAt], 'attackedWithShip');
                      }
                  }
                  if (stringInfo.turnBy == 'p2') {
                      this.ourTurn = true;
                      if (stringInfo.isContainsShip == 'true') {
                          BattleboardComponent.highlightCells(['my' + stringInfo.attackedAt], 'attackedWithShip');
                      } else {
                          BattleboardComponent.highlightCells(['my' + stringInfo.attackedAt], 'attacked');
                      }
                  }
                  if (stringInfo.winningMove == 'true') {
                      this.gameover = (stringInfo.winningMove == 'true');
                      console.log('Winning Move: ' + stringInfo.winningMove);
                      this.ourTurn = false;
                      if (stringInfo.turnBy == 'p1') {
                          this.currentMessage = 'Congratulations, You Won! Refresh to play again.';
                      } else {
                          this.currentMessage = 'Bad Luck! ' + this.opponentUserName + ' won! Refresh to play again.';
                      }

                  }
              }
          });
      }, error => {
          this.overlayOn();
      });
  }

  /**
   * Used to disconnect the web sockets from the server. Never used.
   */
  disconnect() {
      if (this.ws != null) {
          this.ws.ws.close();
      }
      console.log('Disconnected');
  }
}
