import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavbarService } from 'src/app/_shared/_services/navbar/navbar.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor(public navbarService: NavbarService) { }

  ngOnInit() { }
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }


}
