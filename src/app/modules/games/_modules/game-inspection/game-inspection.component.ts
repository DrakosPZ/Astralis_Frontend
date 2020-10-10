import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameDetail } from 'src/app/_shared/_models/details/gameDetail';
import { GameRole } from 'src/app/_shared/_models/gameRole';
import { UserGameDetail } from 'src/app/_shared/_models/details/userGameDetail';
import { User } from 'src/app/_shared/_models/user';

@Component({
  selector: 'app-game-inspection',
  templateUrl: './game-inspection.component.html',
  styleUrls: ['./game-inspection.component.scss']
})
export class GameInspectionComponent implements OnInit {

  @Input() displayed: GameDetail;
  @Input() currentUser: User;
  @Output() gameSend = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }





  //--------------------Caller Method
  getAdmins(): UserGameDetail[]{
    let newList = new Array(); 
    this.displayed.userGameStates.forEach(element => {
      if(element.gameRole != GameRole.PLAYER){
        newList.push(new UserGameDetail(element));
      }
    });
    return newList;
  }

  checkIfAlreadyIn(): boolean{
    let inGame = false;
    this.displayed.userGameStates.forEach(
      connection => {
        if(connection.user.identifier !== this.currentUser.identifier){
          inGame = true;
        }
      }
    )

    return true;
  }

  userInGame(): boolean{
    let inGame = false;
    this.displayed.userGameStates.forEach(
      connection => {
        if(connection.user.identifier === this.currentUser.identifier){
          inGame = true;
        }
      }
    )
    return inGame;
  }

  callLoadGame(){
    this.gameSend.emit("load");
  }

  callCreateCountry(){

  }
  
  callJoinCountry(){

  }
  
  callJoinGame(){
    this.gameSend.emit("join");
  }
  
  callLeaveGame(){
    this.gameSend.emit("leave");
  }





  

  //--------------------Service Methods

}
