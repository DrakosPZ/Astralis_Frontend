import { Component, Inject, OnInit } from '@angular/core';
import { GameDetail } from 'src/app/_shared/_models/details/gameDetail';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { PopoutData, POPOUT_MODAL_DATA } from '../_services/PopoutService/popout.tokens';
import { LogicGameState } from '../_shared/_models/logicGameState';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  id: string;
  name: string;
  userID: string;
  detailGame: GameDetail;

  eventSource = null;

  constructor(
    private gameService: GameService,
    //@Inject(POPOUT_MODAL_DATA) private data: PopoutData
    ) { 
      //this.id = data.game_id;
      //this.name = data.game_name;
      //this.userID = data.user_id;
    }

  ngOnInit(): void {
    this.getGameData();
  }

  ngOnDestroy(): void{

  }

  getGameData(): void {
    /*const id = this.data.game_id
    this.gameService.getDetailGame(id)
      .subscribe(detailGame => {
        this.detailGame = detailGame;
      });*/
    this.eventSource = new EventSource(this.gameService.forwardOpenLobby() + this.userID);
    console.log("CONNECTED SUCCESSFULLY: " + this.eventSource);

    this.eventSource.addEventListener('open', function(e) {
        console.log("onopen", e);
        this.$scope.$apply();
    }, false);

    this.eventSource.addEventListener('error', function(e) {
        if (e.eventPhase == EventSource.CLOSED) {
          console.log('connection closed (..reconnect)', e);
        } else {
          console.log("onerror", e);
        }
        this.$scope.$apply();
      }, false);
    
    this.eventSource.addEventListener('message', function(e) {
        console.log("recieved", e);
        var msg = JSON.parse(e.data);
        console.log(msg)
        this.$scope.$apply();
    }, false);
  }
}
