import { Component, Inject, OnInit } from '@angular/core';
import { PopoutData, POPOUT_MODAL_DATA } from '../_services/PopoutService/popout.tokens';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  id: string;
  name: string;

  constructor(
    @Inject(POPOUT_MODAL_DATA) public data: PopoutData
    ) { 
      this.id = this.data.id;
      this.name = this.data.name;
    }

  ngOnInit(): void {
  }

}
