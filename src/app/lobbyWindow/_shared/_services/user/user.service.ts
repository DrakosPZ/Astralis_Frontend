import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../_models/user';
import { UniversalService } from '../_universal/universal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UniversalService{

  constructor(
    private http: HttpClient) { 
      super();
  }

  /**
   * Generates a HTTP request and sends it to the backend to register a new User.
   * 
   * @param newUser The new User.
   * @returns An observable with the added User if succesfull, otherwhise throws Exception.
   */
  registerNewUser(newUser: User): Observable<User>{
    //Get Identifiert and push User and identifier to the backend
    const body = newUser;
    return this.http.post<User>(this.registerUserURL(), body, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`registered new User w/ id=${newUser.identifier}`)),
      catchError(this.handleError<User>('addUsers'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to add a new User.
   * 
   * @param newUser The new User.
   * @returns An observable with the added User if succesfull, otherwhise throws Exception.
   */
  createNewUser(newUser: User): Observable<User>{
    //Get Identifiert and push User and identifier to the backend
    const body = newUser;
    return this.http.post<User>(this.userURL(), body, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`created new User w/ id=${newUser.identifier}`)),
      catchError(this.handleError<User>('addUsers'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to edit a User.
   * 
   * @param user The edited User.
   * @returns An observable with the edited User if succesfull, otherwhise throws Exception.
   */
  editUser(user: User): Observable<User>{
    //Get Identifiert and push User and identifier to the backend
    return this.http.put<User>(this.userURL(), user, this.httpOptions).pipe(
      tap((user: User) => this.log(`eddited User w/ id=${user.identifier}`)),
      catchError(this.handleError<User>('editUser'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to delete a User.
   * 
   * @param user The to be deleted User.
   * @returns An observable with the deleted User if succesfull, otherwhise throws Exception.
   */
  deleteUser(identifier: string): Observable<User>{
    return this.http.delete<User>(this.deleteUserURL()+identifier, this.httpOptions).pipe(
      tap((deletedUser: User) => this.log(`deleted User w/ id=${deletedUser.identifier}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /**
   * Generates a HTTP request and sends it to the backend to find the User with the according identifier.
   * 
   * @param identifier The Identifier of which the according User should be found.
   * @returns An observable with the looked for User if succesfull, otherwhise throws Exception.
   */
  findUserByIdentifier(identifier: string): Observable<User>{
    return this.http.get<User>(this.userByIdentifierURL()+identifier, this.httpOptions).pipe(
      tap(_ => this.log(`fetched User: w/ id=${_.identifier}`)),
      catchError(this.handleError<User>('getUserById', null))
    );
  }
}
