import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameState } from '../_shared/_models/logicModels/gameState';
import { GameRenderer } from '../gameGraphicsEngine/gameRenderer';
import { WebSocketService } from '../websocketAPI/websocketService';
import { Message } from '../_shared/_models/webModels/Message';
import { Action } from '../_shared/_models/webModels/action';
import { Position } from '../_shared/_models/logicModels/position';
import { Moveship } from '../_shared/_models/webModels/subTypes/moveShip';
import { MessageSpecialized } from '../_shared/_models/webModels/messageSpecialized';
import { CursorKeeper } from '../gameGraphicsEngine/displayers/cursorKeeper';
import { GameStateUpdate } from '../_shared/_models/webModels/subTypes/gameStateUpdate';

import { NavbarService } from 'src/app/_shared/_navigation/service/navbar.service';
import { GameStatus } from 'src/app/_shared/_models/gameStatus';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  id: string;
  userID: string;
  gameID: string;
  token: string;

  gameState: GameState;

  @ViewChild('pixiContainer') pixiContainer;

  //For CleanUp
  paramMapSubscription;
  onMessageReceivedSubscription;

  constructor(
    private navbarService: NavbarService,
    private gameRenderer: GameRenderer,
    private cursorKeeper: CursorKeeper,
    private route: ActivatedRoute,
    private webSocketAPI: WebSocketService
  ) { 
    this.navbarService.hide();
    this.paramMapSubscription =
              this.route.paramMap .subscribe( params => {
                let ids = params.get('ids').split('&')
                this.userID = ids[0];
                this.gameID = ids[1];
                this.token = ids[2];
              });
  }

  /**
   * Method to supply custom behaviour to angular while component is inititalzed
   */
  ngOnInit(): void {
  }

  /**
   * Method to supply custom behaviour to angular after component is inititalzed. 
   * <br>
   * This sets up all the received classes to be fully functional.
   * <ol>
   *  <li>initialized gameRederer and forwards the requried classes to work</li>
   *  <li>initialized webSocket and forwards the logged in gameID and token</li>
   *  <li>subscribes to the webSocket message receiving method, to handle incomming updates</li>
   * </ol>
   */
  ngAfterViewInit(){
    this.cursorKeeper.setUp(this);
    this.gameRenderer.init(this.pixiContainer, this.cursorKeeper, this);
    this.webSocketAPI._setUp(this.gameID, this.token);
    this.onMessageReceivedSubscription =
                this.webSocketAPI.onMessageReceived("")
                        .subscribe((message: any) => 
                              this.handleMessage(message.body)
                          );
  }

  /**
   * Method to unsubscribe and clean all in the component done subscriptions, 
   * also cleaning critical information like IDs and tokens. 
   * Finally calls websocket to disconnect and cleaningMethod of the graphics engine. 
   */
  ngOnDestroy(): void{
    if(this.paramMapSubscription !== null){
      this.paramMapSubscription.unsubscribe();
      this.paramMapSubscription = null;
    }
    if(this.onMessageReceivedSubscription !== null){
      this.onMessageReceivedSubscription.unsubscribe();
      this.onMessageReceivedSubscription = null;
    }
    if(this.userID !== null){
      this.userID = null
    }
    if(this.gameID !== null){
      this.gameID = null
    }
    if(this.token !== null){
      this.token = null
    }
    this.disconnectWebsocket();
    this.cleanGraphics();
  }

  /**
   * Method to return the currently stored GameState
   */
  getCurrentGameState(){
    return this.gameState;
  }

  /**
   * Method to start websocket disconnnection process.
   */
  disconnectWebsocket(){
    this.webSocketAPI._disconnect();
  }

  /**
   * Method to start clean Up process on the graphics engine
   */
  cleanGraphics(){
    this.gameRenderer.cleanUp();
  }

  //WebSocket Local Handling Methods
  /**
   * Method to forward action message to the webSocket
   */
  sendMessage(message: MessageSpecialized){
    //console.log(message)
    message = new Message({
      gameID: message.gameID,
      userID: message.userID,
      action: message.action,
      specializedObject: 
          JSON.stringify(message.specializedObject)
    });
    console.log(message)
    this.webSocketAPI._send(JSON.stringify(message));
  }

  /**
   * Method to process received message from the websocket. 
   * Messages can be
   * <ul>
   *  <li>GameUpdate: message contains a GameState supposed to replace old one</li>
   *  <li>ClosedGame: lobby has been closed and game shouldn't be expecting or sending new updates for the duration.</li>
   *  <li>Disconnected: because of one reason or another, connecte user has left the game, so game connection is to be terminated</li>
   * </ul> 
   * 
   * Maybe put this message decipherer into its own class? Could then call a callback that's being provided here and links it up to the rest of the structure?
   * 
   * @param message stringified message from the webSocketAPI
   */
  handleMessage(message){
    try{
      let received =  new Message(JSON.parse(message));
    
      switch(received.action){
          case Action.GAMEUPDATE: {
              let gameStateUpdate: GameStateUpdate = new GameStateUpdate(JSON.parse(received.specializedObject));
              this.receivedGameState(gameStateUpdate.gameState);
              break;
          }
          case Action.CLOSEDGAME: {
              console.log("Closed Game Received");
              this.webSocketAPI.setStatus(GameStatus.CLOSED);
              //TODO: ADD Visual Display for when game Closed
              break;
          }
          case Action.DISCONNECTED: {
              console.log("Disconnected Game");
              //this.disconnectWebsocket();
              if(received.userID == this.userID && 
                  received.gameID == this.gameID){
                window.close();
                //TODO: ADD Visual Display for when game Disconnecte
              }
              break;
          }
      }
    } catch(e){
      console.error(e);
    }
  }

  /**
   * Method to update the currently loaded gameState and start updating behaviour on the graphics engine.
   * 
   * @param gameState the newly received GameState
   * */
  receivedGameState(gameState: GameState){
    try{
      this.gameState = gameState;
      this.webSocketAPI.setStatus(this.gameState.gameStatus);
      // this.gameRenderer.drawState(this.gameState);
      this.gameRenderer.gameStateChanged();
    } catch(e){
      console.error(e);
    }
  }
    

  //Test methods
  moveShip(newTarget: Position){
    let shipID = 1;
    let message: MessageSpecialized;
    if(shipID == 1){
      message = new MessageSpecialized({
            gameID: this.gameID, 
            userID: this.userID, 
            action: Action.MOVE, 
            specializedObject: 
                  new Moveship({shipId: 2, newGoal: newTarget})
      });

    }

    if(shipID == 2){
      message = new MessageSpecialized({
            gameID: this.gameID, 
            userID: this.userID, 
            action: Action.MOVE, 
            specializedObject: 
                  new Moveship({shipId: 4, newGoal: newTarget})
      });

    }

    //console.log(message);
    this.sendMessage(message);
  }

}
