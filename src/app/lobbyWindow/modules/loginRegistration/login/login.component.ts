import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LoginService } from 'src/app/lobbyWindow/_shared/_services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  usernameText = "";
  passwordText = "";

  constructor(private loginService :LoginService) { }

  /**
   * Method to contain custom component initialization behaviour
   */
  ngOnInit(): void {
  }

  /**
   * Method controlling if all input fields are filled.
   * 
   * @returns if so returns true, otherwhsie false.
   */
  allFilled(){
    if(this.username.hasError('required') || this.password.hasError('required')){
      return false;
    }
    return true;
  }
  
  /**
   * Method containing displayed error message if iput field is not filled. 
   * 
   * @returns error Message as string
   */
  getErrorMessageUsername() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
  }

  /**
   * Method containing displayed error message if iput field is not filled. 
   * 
   * @returns error Message as string
   */
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
  }

  /**
   * Method to start login process with the login service, forwarding the given password and username input.
   */
  login(){
    this.loginService.login(this.usernameText, this.passwordText);
  }
}
