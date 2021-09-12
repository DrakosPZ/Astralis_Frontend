import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavbarService } from 'src/app/_shared/_services/navbar/navbar.service';

@Component({
  selector: 'app-log-in-sidenav-list',
  templateUrl: './log-in-sidenav-list.component.html',
  styleUrls: ['./log-in-sidenav-list.component.scss']
})
export class LogInSidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  @Output() logOut = new EventEmitter();

  constructor(public navbarService: NavbarService) { }

  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  public onLogout = () => {
    this.logOut.emit();
    this.sidenavClose.emit();
  }

}
