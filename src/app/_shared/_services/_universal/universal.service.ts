import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

//ALL THE URLS USED TO COMMUNICATE WITH THE BACKEND
const HTTP_URL ="http://";
const START_URL = "localhost:8080";

const USER_URL = "/user";
const USERNAME_URL = "?username=";
const LOGIN = "/login";
const LOGOUT = "/logout";
const AFTER_LOGIN = "/afterLogin";

@Injectable({
  providedIn: 'root'
})
export class UniversalService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor() { }

  /**
   * Used to set the communication type to HTTP
   */
  protected jsonHttpOption(): {}{
    return this.httpOptions;
  }







  //-----------------------------------------User Related URLs
  /**
   * Gets the URL to the user API
   * 
   * @returns the UserAPIUrl string
   */
  protected userURL(): string{
    return HTTP_URL+START_URL+USER_URL;
  }







  
  //-----------------------------------------Authentication Related URLs
  /**
   * Gets the URL to the logout route
   * 
   * @returns the PersonAPIUrl + LogoutRoute string
   */
  protected logoutRoute(): string{
    return this.userURL()+LOGOUT;
  }

  /**
   * Gets the URL to the login route
   * 
   * @returns the PersonAPIUrl + LoginRoute string
   */
  protected loginRoute(): string{
    return this.userURL()+LOGIN;
  }

  /**
   * Gets the URL to the after login route
   * 
   * @returns the PersonAPIUrl + AfterLoginRoute string
   */
  protected loginGetUserRoute(): string{
    return this.userURL()+AFTER_LOGIN;
  }

  /**
   * Extends the user URL with the Get by username part
   * 
   * @returns the UserAPIUrl + username request param part.
   */
  protected userByUsernameURL(): string{
    return this.userURL()+USERNAME_URL;
  }





  //-----------------------------------------Error and Console Handling
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  protected log(message: string) {
    console.log(message);
    //this.messageService.add(`HeroService: ${message}`);
  }
  
}
