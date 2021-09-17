import { Client } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';


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
    stompClient: any;
    returnedMessages: Subject<string>  = new Subject<string>();
    
    receivingSubscription;

    constructor(){}

    /**
     * TODO: ADD COMMENTARY
     * 
     * @param gameID 
     */
    _setUp(gameID: string, userToken: string){

        this.gameID = gameID;
        this.userToken = userToken;
        this._configure();

        this.stompClient.activate();

    }

    /**
     * TODO: ADD COMMENTARY
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
     * 
     * TODO: ADD COMMENTARY
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
    * 
    * TODO: ADD COMMENTARY
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
        console.log("Disconnected");
    }

    
    /**
    * 
    * TODO: ADD COMMENTARY
    */
    // on error, schedule a reconnection attempt
    _onError() {
        console.log("Error -> Specify Error Behaviour");
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {



        //console.log("calling logout api via web socket: " + message);
        this.stompClient.publish({ destination: SENDING_ENDPOINT + this.gameID, body: message });

    }

    
    /**
    * 
    * TODO: ADD COMMENTARY
    * @param message 
    * @returns 
    */
    onMessageReceived(message): Observable<string> {
        //console.log("Message Recieved from Server :: " + message);
        
        this.returnedMessages.next(message);
        return this.returnedMessages.asObservable();
    }
}