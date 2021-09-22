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

  /**
   * Method containing custom cleanup behaviour
   */
  ngOnDestroy(): void {
    this.viewportMobileQuery.removeEventListener('change', this._viewportQueryListener);
  }

  /**
   * Method requesting of loginService if currently logged in and forwarding results to html.
   * 
   * @returns if user logged in == true
   */
  isLoggedIn(): boolean{
    return this.loginService.isLoggedIn();
  }

  /**
  * Method to call loginService to log user out.  
  */
  logUserOut(){
    this.loginService.logout();
  }
}
