import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from 'src/app/_shared/_services/login/login.service';
import { NavbarService } from 'src/app/_shared/_services/navbar/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Astralis-Frontend';
  viewportMobileQuery: MediaQueryList;

  private _viewportQueryListener: () => void;

  constructor(
              private loginservice: LoginService) {
  }

  ngOnDestroy(): void {
    this.viewportMobileQuery.removeEventListener('change', this._viewportQueryListener);
  }

  isLoggedIn(): boolean{
    return this.loginservice.isLoggedIn();
  }

  logUserOut(){
    this.loginservice.logout();
  }
}
