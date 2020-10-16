import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDetail } from 'src/app/_shared/_models/details/gameDetail';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { PopoutData, POPOUT_MODAL_DATA } from '../_services/PopoutService/popout.tokens';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  id: string;
  name: string;
  detailGame: GameDetail;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    @Inject(POPOUT_MODAL_DATA) public data: PopoutData
    ) { 
      this.id = this.data.id;
      //this.name = this.data.name;
    }

  ngOnInit(): void {
    this.getGameData();
  }

  getGameData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.getDetailGame(id)
      .subscribe(detailGame => {
        this.detailGame = detailGame;
        console.log("Called Server and got this game: " + this.detailGame);
      });
  }

}
