import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from './_shared/_services/login/login.service';

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
              private changeDetectionRef: ChangeDetectorRef, 
              private media: MediaMatcher,
              private loginservice: LoginService) {
    this.viewportMobileQuery = media.matchMedia('(max-width: 600px)');
    this._viewportQueryListener = () => changeDetectionRef.detectChanges();
    this.viewportMobileQuery.addEventListener('change', this._viewportQueryListener);
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
