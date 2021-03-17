import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/_shared/_services/game/game.service';
import { LogicGameState } from '../_shared/_models/logicGameState';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  id: string;
  userID: string;
  gameID: string;

  eventSource = null;
  gameState: LogicGameState;
  @ViewChild('#displayScreen') canvas: ElementRef;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    ) { 
      this.route.paramMap.subscribe( params => {
        let ids = params.get('ids').split('&')
        this.userID = ids[0];
        this.gameID = ids[1];
      });
    }

  ngOnInit(): void {
    this.getGameData();

    //To Test GameDrawing
    this.drawState();
  }

  ngOnDestroy(): void{

  }

  getGameData(): void {
    //TODO: TAKE CARE OF closing connection when window closed
    this.eventSource = new EventSource(this.gameService.forwardOpenLobby() + this.gameID);
    console.log("CONNECTED SUCCESSFULLY: " + this.eventSource);

    this.eventSource.addEventListener('message', message => {
      this.gameState = JSON.parse(message.data)
      console.log("Recieved Data");
      console.log(this.gameState);
      this.drawState();
    });
  }


  drawState(): void{
    console.log(this.canvas);
    /*this.canvas.nativeElement.
    this.gameState.countries.forEach(country => {
      let ship = this.canvas.nativeElement.insertAdjacentHTML('beforeend', '<area class="ship"/>');
      ship.style.color = "";
    });*/
    const canvas: HTMLCanvasElement = document.querySelector("#mainGalaxyScreen");
    // Initialize the GL context
    const gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0, 0, 0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
