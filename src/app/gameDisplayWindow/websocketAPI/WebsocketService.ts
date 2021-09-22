import { Client } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GameStatus } from 'src/app/_shared/_models/gameStatus';


const SOCKET_URL = "ws://localhost:8080/ws";
const ERROR = "/errors";
const RECEIVING_ENDPOINT = "/topic/gameUpdates/";
const SENDING_ENDPOINT = "/app/message/";


@Injectable({
    providedIn: 'root',
  })
export class WebSocketService {

    gameID: string = "";
    userToken: string = "";
    status: GameStatus = GameStatus.CLOSED;
    stompClient: any;
    returnedMessages: Subject<string>  = new Subject<string>();
    
    
    receivingSubscription;

    constructor(){}

    /**
     * Method used to start initialization process and storing data used for the connection.
     * 
     * @param gameID gameId to which the socket should connect to.
     * @param userToken JWT token got when user logged in, used to authenticate connection with the server.
     */
    _setUp(gameID: string, userToken: string){

        this.gameID = gameID;
        this.userToken = userToken;
        this._configure();

        this.stompClient.activate();

    }

    /**
     * Method to setup connection information,  as for exmple setting the custom header.
     */
    _configure(){

        this.stompClient = new Client();
        
        this.stompClient.configure({
            brokerURL: SOCKET_URL,

            
            connectHeaders: {
              login: 'user',
              passcode: 'password',
              'Authorization': 'Bearer Bearer ' + this.userToken
            },

            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,

            onConnect: () => {
                this._connect();
            },
            // Helps during debugging, remove in production
            debug: (str) => {
              //console.log(str);
            }
          });

    }

    /**
     * Method to specify behaviour on successfull connection.
     * <ul>
     *  <li>sets subscription to receiving Endpoint.</li>
     *  <li>sets on Error behaviour.</li>
     * </ul>
     */
    _connect() {
        
        this.receivingSubscription = this.stompClient.subscribe(RECEIVING_ENDPOINT + this.gameID, message => {
            this.onMessageReceived(message);
        }, {
            'Authorization': "Bearer Bearer " + this.userToken
          });

        this.stompClient.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
            this._onError();
        };

    };
    
    /**
    * Method to unsubscribe from all subscriptions, deleting connection data as well as deactivating the used Stomp Client.
    */
    _disconnect() {
        if (this.stompClient !== null) {
            if(this.receivingSubscription !== null){
                this.receivingSubscription.unsubscribe();
                this.receivingSubscription = null;
            }
            this.stompClient.deactivate();
            this.stompClient = null;
        }
        if(this.gameID !== ""){
            this.gameID = "";
        }
        if(this.userToken !== ""){
            this.userToken = "";
        }
        this.setStatus(GameStatus.CLOSED);
        console.log("Disconnected");
    }

    
    /**
    * Method contains onError behaviour.
    */
    // on error, schedule a reconnection attempt
    _onError() {
        console.log("Error -> Specify Error Behaviour");
    }

	/**
	 * Send message to sever via web socket, messages are only send when GameStatus is on RUNNING.
	 * @param {*} message message to be send to websocket.
	 */
    _send(message) {
        //console.log("calling logout api via web socket: " + message);
        if(this.status === GameStatus.RUNNING){ // Only when running game actions can be taken
            this.stompClient.publish({ destination: SENDING_ENDPOINT + this.gameID, body: message });
        }
        else{
            console.log(this.status);
        }
    }

    /**
    * Method contains onMessageReceived behaviour.
    * Forwards message String to screen component interpretar.
    * 
    * @param message the stringified socket message.
    * @returns a nudge to the subscription on the screen component side, containing the message.
    */
    onMessageReceived(message): Observable<string> {
        //console.log("Message Recieved from Server :: " + message);
        this.returnedMessages.next(message);
        return this.returnedMessages.asObservable();
    }

    /**
     * Setter for the websockets GameStatus.
     * 
     * @param status to be set status.
     */
    setStatus(status: GameStatus){
        this.status = status;
    }
}