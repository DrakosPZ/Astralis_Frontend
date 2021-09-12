import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavbarService } from 'src/app/_shared/_services/navbar/navbar.service';

@Component({
  selector: 'app-log-in-header',
  templateUrl: './log-in-header.component.html',
  styleUrls: ['./log-in-header.component.scss']
})
export class LogInHeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  @Output() public logOut = new EventEmitter();
  constructor(public navbarService: NavbarService) { }

  ngOnInit(): void {
  }

  public sendLogOut(){
    this.logOut.emit();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
