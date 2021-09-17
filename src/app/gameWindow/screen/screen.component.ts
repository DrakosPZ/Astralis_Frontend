import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogicGameState } from '../_shared/_models/logicGameState';
import { GameRenderer } from '../_shared/_renderers/GameRenderer';
import { Client } from '@stomp/stompjs';
import { WebSocketService } from '../_shared/_services/WebsocketService';
import { Message } from '../_shared/_models/webModels/Message';
import { Action } from '../_shared/_models/webModels/action';
import { Position } from '../_shared/_models/position';
import { Moveship } from '../_shared/_models/webModels/subTypes/moveShip';
import { MessageSpecialized } from '../_shared/_models/webModels/messageSpecialized';
import { CursorKeeper } from '../_shared/_renderers/CursorKeeper';
import { NavbarService } from 'src/app/_shared/_services/navbar/navbar.service';

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

  gameState: LogicGameState;

  @ViewChild('pixiContainer') pixiContainer; // this allows us to reference and load stuff into the div container

  client: Client;

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
   * 
   * TODO: ADD COMMENTARY
   */
  ngOnInit(): void {
  }
  /**
   * 
   * TODO: ADD COMMENTARY
   */
  ngAfterViewInit(){
    this.cursorKeeper.setUp(this);
    this.gameRenderer.init(this.pixiContainer, this.cursorKeeper);
    this.webSocketAPI._setUp(this.gameID, this.token);
    this.onMessageReceivedSubscription =
                this.webSocketAPI.onMessageReceived("")
                        .subscribe((message: any) => 
                              this.handleMessage(message.body)
                          );
  }

  /**
   * 
   * TODO: ADD COMMENTARY
   * TODO: ADD ALL THINGS TO BE CLEANED UP
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
   * 
   * TODO: ADD COMMENTARY
   */
  disconnectWebsocket(){
    this.webSocketAPI._disconnect();
  }

  /**
   * 
   * TODO: ADD COMMENTARY
   */
  cleanGraphics(){
    this.gameRenderer.cleanUp();
  }

  //WebSocket Local Handling Methods
  /**
   * 
   * TODO: ADD COMMENTARY
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
   * 
   * TODO: ADD COMMENTARY
   * @param message 
   */
  handleMessage(message){
    try{
      let recieved =  new LogicGameState(JSON.parse(message));
      this.gameState = recieved;
      console.log(this.gameState);
      this.gameRenderer.drawState(recieved);
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
