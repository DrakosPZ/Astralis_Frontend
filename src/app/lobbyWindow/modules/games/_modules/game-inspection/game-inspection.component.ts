import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameDetail } from 'src/app/lobbyWindow/_shared/_models/details/gameDetail';
import { GameRole } from 'src/app/lobbyWindow/_shared/_models/gameRole';
import { UserGameDetail } from 'src/app/lobbyWindow/_shared/_models/details/userGameDetail';
import { User } from 'src/app/lobbyWindow/_shared/_models/user';
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

  //TODO: Add Documentation
  ngOnInit(): void {
    this.isModerator = this.adminInGame();
    if(this.displayed.status == GameStatus.PAUSED){
      this.loadingBText = this.unpause;
    } else {
      this.loadingBText = this.pause;
    }
  }





  //--------------------Caller Method
  //TODO: Add Documentation
  getAdmins(): UserGameDetail[]{
    let newList = new Array(); 
    this.displayed.userGameLobbies.forEach(element => {
      if(element.gameRole != GameRole.PLAYER){
        newList.push(new UserGameDetail(element));
      }
    });
    return newList;
  }

  //TODO: Add Documentation
  checkIfAlreadyIn(): boolean{
    //currently the same as the one below, maybe this is supposed to check if they created an empire or such in the game?
    let inGame = false;
    this.displayed.userGameLobbies.forEach(
      connection => {
        if(connection.user.identifier !== this.currentUser.identifier){
          inGame = true;
        }
      }
    )

    return true;
  }

  //TODO: Add Documentation
  userInGame(): boolean{
    let inGame = false;
    this.displayed.userGameLobbies.forEach(
      connection => {
        if(connection.user.identifier === this.currentUser.identifier){
          inGame = true;
        }
      }
    )
    return inGame;
  }

  //TODO: Add Documentation
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

  //TODO: Add Documentation
  canStartGame(): boolean{
    if(this.displayed.status === GameStatus.UNINITIALIZED || 
       this.displayed.status === GameStatus.CLOSED){
      return true;
    }
    return false;
  }

  //TODO: Add Documentation
  canPauseGame(): boolean{
    if(this.displayed.status === GameStatus.RUNNING || 
       this.displayed.status === GameStatus.PAUSED){
      return true;
    }
    return false;
  }

  //TODO: Add Documentation
  canStoreGame(): boolean{
    if(this.displayed.status === GameStatus.RUNNING || 
       this.displayed.status === GameStatus.PAUSED){
      return true;
    }
    return false;
  }

  //TODO: Add Documentation
  canCloseGame(): boolean{
    if(this.displayed.status === GameStatus.RUNNING|| 
       this.displayed.status === GameStatus.PAUSED){
      return true;
    }
    return false;
  }

  //TODO: Add Documentation
  canLoadGame(): boolean{
    if(this.displayed.status === GameStatus.RUNNING){
      return true;
    }
    return false;
  }

  //TODO: Add Documentation
  callStartGame(){
    this.gameSend.emit("start");
  }

  //TODO: Add Documentation
  callSaveGame(){
    this.gameSend.emit("save");
  }

  //TODO: Add Documentation
  callPauseGame(){
    this.gameSend.emit("pause");
    if(this.loadingBText === this.pause){
      this.loadingBText = this.unpause;
    } else {
      this.loadingBText = this.pause;
    }
  }

  //TODO: Add Documentation
  callCloseGame(){
    this.gameSend.emit("close");
  }

  //TODO: Add Documentation
  callLoadGame(){
    this.gameSend.emit("load");
  }

  //TODO: Add Documentation
  callCreateCountry(){
    console.error("Game Inspection Component #89: , Creating Country not yet implemented!");
  }
  
  //TODO: Add Documentation
  callJoinCountry(){
    console.error("Game Inspection Component #89: , Join Country not yet implemented!");
  }
  
  //TODO: Add Documentation
  callJoinGame(){
    this.gameSend.emit("join");
  }
  
  //TODO: Add Documentation
  callLeaveGame(){
    this.gameSend.emit("leave");
  }





  

  //--------------------Service Methods

}
