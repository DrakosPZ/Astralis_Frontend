import { ComponentPortal, DomPortalOutlet, PortalInjector } from '@angular/cdk/portal';
import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, Inject, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDetail } from 'src/app/_shared/_models/details/gameDetail';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { PopoutData, POPOUT_MODALS, POPOUT_MODAL_DATA } from '../_services/PopoutService/popout.tokens';

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

  constructor(
    private gameService: GameService,
    @Inject(POPOUT_MODAL_DATA) private data: PopoutData
    ) { 
      this.id = data.game_id;
      this.name = data.game_name;
      this.userID = data.user_id;
    }

  ngOnInit(): void {
    this.getGameData();
  }

  getGameData(): void {
    const id = this.data.game_id
    this.gameService.getDetailGame(id)
      .subscribe(detailGame => {
        this.detailGame = detailGame;
        console.log("Called Server and got this game: ");
        console.log(this.detailGame);
      });
  }

}
