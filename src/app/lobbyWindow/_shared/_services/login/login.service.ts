import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { User } from '../../_models/user';
import { UniversalService } from '../_universal/universal.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends UniversalService{

  currentUser: User;
  activeToken: String;
  static readonly TOKEN_STORAGE_KEY = 'wK8HQFFdBDWXf5PJQrua';
  static readonly USERNAME_STORAGE_KEY = 'MSoGSir1mjasDV75DMa8';
  redirectToUrl: string = '/Dashboard';

  httpOptionsObserver = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient,
              private router: Router) { 
    super();
  }

  /**
   * Sets the current User field to the given User.
   * 
   * @param user The to be locally stored User
   */
  public setCurrentUser(user: User){
    this.currentUser = user;
  }

  /**
   * Returns the currently stored User. 
   * In case current User is undefinded, the user is automatically loged out.
   * 
   * @returns Observable containing currentUser.
   */
  public getCurrentUser(): Observable<User>{
    if(typeof this.currentUser === "undefined"){
      this.logoutAndCleanup();
    }
    return of(this.currentUser)
  }

  /**
   * This method performs the entire login process.
   * First it calls the backend login route with the given login information 
   *      and retrieves the auth. Token from the respons.
   * Next it stores the token locally and calls the loggedInUser Route, to retrieve the Users data.
   * The User data is then stored locally and the navigation component called to navigate either to the last stored side,
   *      or to the dashboard.
   * 
   * @param username To be transmitted username.
   * @param password To be transmitted password.
   */
  login(username: string, password: string): void{
    const body = {};
      body[username] = password;
    //calling the login Route to recieve a Token
    this.requestToken(body).pipe(first()).subscribe((res: HttpResponse<any>) => {
        //Storing the token locally
        this.saveToken(res.headers.get('authorization'));
        //Calling the Route to get the logged In User
        this.loginGetUser(body).pipe(first()).subscribe(element => {
          //Storing loggedIn User and switching to Home Page
          this.setCurrentUser(element);
          console.log(element)
          this.saveUsername(element.loginInformation.loginName);
          this.router.navigate([this.redirectToUrl]);
        })
      });
  }

  /**
   * Sends a HTTP Request to the Backend, retrieving an authorization token for the logged in User 
   * 
   * @param data Data object that contains the to be used username and password.
   * @returns An observable Object containing the HttpResponse Object if successfull, otherwhise throwing an Exception.
   */
  requestToken(data: {}): any{
    const body = data;
    return this.http.post<User>(this.loginRoute(), body, this.httpOptionsObserver)
      .pipe(
        tap(_ => this.log('fetched Logged In User')),
        catchError(this.handleError<User>('getLoggedInUser', null))
      );
  }
  
  /**
   * Sends a HTTP Request to the Backend, retrieving the logged in User Data
   * 
   * @param data Data object that contains the to be used username and password.
   * @returns An observable Object containing the retrieved User if successfull, otherwhise throwing an Exception.
   */
  loginGetUser(data: {}): Observable<User>{
    const body = data;
    return this.http.post<User>(this.loginGetUserRoute(), body, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched Logged In User')),
        catchError(this.handleError<User>('getLoggedInUser', null))
      );
  }

  /**
   * Sends a HTTP Request to the Backend, retrieving a User's Data based on their Username.
   * 
   * @param username Username to be used to look for the User's Data.
   * @returns An observable Object containing the retrieved User if successfull, otherwhise throwing an Exception.
   */
  loginGetUserByUsername(username: string): Observable<User>{
    return this.http.get<User>(this.userByUsernameURL() + username, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched Logged In User')),
        catchError(this.handleError<User>('getLoggedInUser', null))
      );
  }

  /**
   * Sends a HTTP Request to the backend to logout the currently logged in User.
   * On completion the logout and cleanup Method is called.
   */
  public logout(): void {
    this.http.get(this.logoutRoute(), {responseType: 'text'}).pipe(first())
      .subscribe(() =>{
        this.logoutAndCleanup();
      });
  }

  /**
   * Returns if user is currently logged in
   * 
   * @returns true or false, depending if currentUser is set or not.
   */
  public isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  /**
   * saves the delivered Token in the Tokenstorage.
   * 
   * @param token the to be saved token 
   */
  private saveToken(token: string){
    localStorage.setItem(LoginService.TOKEN_STORAGE_KEY, token);
  }

  /**
   * saves the delivered username in the Usernamestorage.
   * 
   * @param username to be saved username
   */
  private saveUsername(username: string){
    localStorage.setItem(LoginService.USERNAME_STORAGE_KEY, username);
  }

  /**
   * loads the currently saved token
   * 
   * @returns currently saved string token 
   */
  public getToken(): string {
    return localStorage.getItem(LoginService.TOKEN_STORAGE_KEY);
  }

  /**
   * loads the currently saved username
   * 
   * @returns currently saved string username 
   */
  public getUsername(): string {
    return localStorage.getItem(LoginService.USERNAME_STORAGE_KEY);
  }

  /**
   * Navigates the user to the login page, 
   *    removes the currnetly stored token 
   *    and sets the currently logged in User to null.
   * 
   */
  private logoutAndCleanup(){
    this.router.navigate(['/Login']);
    localStorage.removeItem(LoginService.TOKEN_STORAGE_KEY);
    this.setCurrentUser(null);
  }

}
