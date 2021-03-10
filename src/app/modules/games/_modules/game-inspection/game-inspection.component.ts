import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameDetail } from 'src/app/_shared/_models/details/gameDetail';
import { GameRole } from 'src/app/_shared/_models/gameRole';
import { UserGameDetail } from 'src/app/_shared/_models/details/userGameDetail';
import { User } from 'src/app/_shared/_models/user';
import { GameStatus } from 'src/app/_shared/_models/gameStatus';

@Component({
  selector: 'app-game-inspection',
  templateUrl: './game-inspection.component.html',
  styleUrls: ['./game-inspection.component.scss']
})
export class GameInspectionComponent implements OnInit {

  @Input() displayed: GameDetail;
  @Input() currentUser: User;
  @Output() gameSend = new EventEmitter();
  loadingBText: string = "Pause Game";
  pause = "Pause Game";
  unpause = "Unpause Game";
  isModerator: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.isModerator = this.adminInGame();
    if(this.displayed.status == GameStatus.PAUSED){
      this.loadingBText = this.unpause;
    } else {
      this.loadingBText = this.pause;
    }
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

  adminInGame(): boolean{
    let isAdmin = false;
    let admins = this.getAdmins();
    admins.forEach(
      admin => {
        if(admin.user.identifier === this.currentUser.identifier){
          isAdmin = true;
        }
      }
    );
    return isAdmin;
  }

  canStartGame(): boolean{
    if(this.displayed.status === GameStatus.UNINITIALIZED || 
       this.displayed.status === GameStatus.CLOSED){
      return true;
    }
    return false;
  }

  canPauseGame(): boolean{
    if(this.displayed.status === GameStatus.RUNNING || 
       this.displayed.status === GameStatus.PAUSED){
      return true;
    }
    return false;
  }

  canStoreGame(): boolean{
    if(this.displayed.status === GameStatus.RUNNING || 
       this.displayed.status === GameStatus.PAUSED ||
       this.displayed.status === GameStatus.CLOSED){
      return true;
    }
    return false;
  }

  canCloseGame(): boolean{
    if(this.displayed.status === GameStatus.RUNNING|| 
       this.displayed.status === GameStatus.PAUSED){
      return true;
    }
    return false;
  }

  canLoadGame(): boolean{
    if(this.displayed.status === GameStatus.RUNNING){
      return true;
    }
    return false;
  }

  callStartGame(){
    this.gameSend.emit("start");
  }

  callSaveGame(){
    this.gameSend.emit("save");
  }

  callPauseGame(){
    this.gameSend.emit("pause");
    if(this.loadingBText === this.pause){
      this.loadingBText = this.unpause;
    } else {
      this.loadingBText = this.pause;
    }
  }

  callCloseGame(){
    this.gameSend.emit("close");
  }

  callLoadGame(){
    this.gameSend.emit("load");
  }

  callCreateCountry(){
    console.error("Game Inspection Component #89: , Creating Country not yet implemented!");
  
  }
  
  callJoinCountry(){
    console.error("Game Inspection Component #89: , Join Country not yet implemented!");
  }
  
  callJoinGame(){
    this.gameSend.emit("join");
  }
  
  callLeaveGame(){
    this.gameSend.emit("leave");
  }





  

  //--------------------Service Methods

}
