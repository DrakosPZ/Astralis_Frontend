import * as Stomp from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';


const SOCKET_URL = "http://localhost:8080/ws";
const ERROR = "/errors";
const RECEIVING_ENDPOINT = "/topic/gameUpdates/";
const SENDING_ENDPOINT = "/app/message/";


@Injectable({
    providedIn: 'root',
  })
export class WebSocketService {

    topic: string = "/topic/greetings";
    gameID: string = "";
    stompClient: any;
    returnedMessages: Subject<string>  = new Subject<string>();
    
    constructor(){}

    _setUp(gameID: string){

        this.gameID = gameID;
        this._configure();

        this.stompClient.activate();

    }

    _configure(){

        this.stompClient = new Client();
        
        this.stompClient.configure({
            brokerURL: SOCKET_URL,

            /*
            connectHeaders: {
              login: 'user',
              passcode: 'password',
            },*/

            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,

            onConnect: () => {
                this._connect();
            },
            // Helps during debugging, remove in production
            debug: (str) => {
              console.log(new Date(), str);
            }
          });

    }

    _connect() {
        
        this.stompClient.subscribe(RECEIVING_ENDPOINT + this.gameID, message => {
            alert(message.body);
            this.onMessageReceived(message);
        });
        
        this.stompClient.onConnect = function (frame) {
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
        };

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

    _disconnect() {

        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");

    }

    // on error, schedule a reconnection attempt
    _onError() {
        console.log("Error -> Specify Error Behaviour");
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {

        console.log("calling logout api via web socket: " + message);
        this.stompClient.publish({ destination: SENDING_ENDPOINT, body: message });

    }

    onMessageReceived(message): Observable<string> {
        console.log("Message Recieved from Server :: " + message);
        
        this.returnedMessages.next(message);
        return this.returnedMessages.asObservable();
    }
}