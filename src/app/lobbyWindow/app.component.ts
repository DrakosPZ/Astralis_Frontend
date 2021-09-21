import { Component } from '@angular/core';
import { LoginService } from 'src/app/lobbyWindow/_shared/_services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Astralis-Frontend';
  viewportMobileQuery: MediaQueryList;

  private _viewportQueryListener: () => void;

  constructor(private loginService: LoginService) {
  }

  ngOnDestroy(): void {
    this.viewportMobileQuery.removeEventListener('change', this._viewportQueryListener);
  }

  isLoggedIn(): boolean{
    return this.loginService.isLoggedIn();
  }

  logUserOut(){
    this.loginService.logout();
  }
}
