import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LoginService } from 'src/app/_shared/_services/login/login.service';

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

  ngOnInit(): void {
  }

  allFilled(){
    if(this.username.hasError('required') || this.password.hasError('required')){
      return false;
    }
    return true;
  }
  
  getErrorMessageUsername() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
  }

  login(){
    this.loginService.login(this.usernameText, this.passwordText);
  }
}
