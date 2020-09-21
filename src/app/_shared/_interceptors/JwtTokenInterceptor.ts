import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../_services/login/login.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(public auth: LoginService, private router: Router) {}

  /**
   * Intercepts every HTTP Request send out to place the Auth. Token in the Header.
   * 
   * @param request current part of the request
   * @param next Part of the HTTP Rrquest
   * @returns Observable HTTP event used for further HTTP Work
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });

    return next.handle(interceptedRequest).pipe(catchError(x => this.handleErrors(x)));
  }  
  
  /**
   * In case a 401 error appears the user is automatically logged out and navigated to the login page.
   * The old route is stored and will be returned once loged in.
   * 
   * @param err occured Error
   */
  private handleErrors(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.auth.redirectToUrl = this.router.url;
      this.router.navigate(['/Login']);
      return of(err.message);
    }
  }
}