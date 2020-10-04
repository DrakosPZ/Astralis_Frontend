import { Component, Input, OnInit } from '@angular/core';
import { GameDetail } from 'src/app/_shared/_models/details/gameDetail';
import { GameRole } from 'src/app/_shared/_models/gameRole';
import { UserGameDetail } from 'src/app/_shared/_models/details/userGameDetail';

@Component({
  selector: 'app-game-inspection',
  templateUrl: './game-inspection.component.html',
  styleUrls: ['./game-inspection.component.scss']
})
export class GameInspectionComponent implements OnInit {

  @Input() displayed: GameDetail;

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

}
