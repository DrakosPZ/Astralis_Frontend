import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavbarService } from 'src/app/_shared/_services/navbar/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {  
  
  @Output() public sidenavToggle = new EventEmitter();

  constructor(public navbarService: NavbarService) { }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
