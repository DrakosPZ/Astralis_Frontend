import { Component, OnInit } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginInformation } from 'src/app/_shared/_models/LoginInformation';
import { User } from 'src/app/_shared/_models/user';
import { UserRole } from 'src/app/_shared/_models/userRole';
import { LoginService } from 'src/app/_shared/_services/login/login.service';
import { UserService } from 'src/app/_shared/_services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  public passwordConfirmation = new FormControl('', [Validators.required, PasswordRepetitionValidator(this.password)]);
  public displayname = new FormControl('', [Validators.required]);

  public newUser: User;


  constructor(private userService: UserService,
              private loginService: LoginService) { 
    this.newUser = new User({});
    this.newUser.role = UserRole.USER;
  }

  ngOnInit(): void {
  }

  register(){
    this.userService.registerNewUser(this.newUser)
      .pipe(first()).subscribe(registeredUser => {
        this.loginService.login(registeredUser.loginInformation.loginName, this.newUser.loginInformation.password);
      });
  }


  //--------------------Validation Error Messages
  /**
   * Checks if all FormControls are valid.
   * @returns true if all formcontrols have no Errors
   */
  allFilled(){
    if(this.username.hasError('required') || this.password.hasError('required') || 
       this.passwordConfirmation.hasError('required') || this.passwordConfirmation.hasError('PasswordRepetition') || 
       this.displayname.hasError('required')){
      return false;
    }
    return true;
  }
  
  /**
   * Checks if username Input has an Error, if so it returns an error message.
   * @returns error Message as string
   */
  getErrorMessageUsername() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
  }
  
  /**
   * Checks if password Input has an Error, if so it returns an error message.
   * @returns error Message as string
   */
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
  }
  
  /**
   * Checks if passwordConfirmation input has an Error, and if it wasn't repeated coherently, if so it returns an error message.
   * @returns error Message as string
   */
  getErrorMessagePasswordConfirmation() {
    if (this.passwordConfirmation.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.passwordConfirmation.hasError('PasswordRepetition')) {
      return 'Passwordbase and Repetition are not equal!';
    }
  }
  
  /**
   * Checks if Displayname Input has an Error, if so it returns an error message.
   * @returns error Message as string
   */
  getErrorMessageDisplayname() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
  }


}

function PasswordRepetitionValidator(passwordControl: FormControl): ValidatorFn {
  return (control: FormControl): { [key: string]: boolean } | null => {
    let passwordRepeat = control.value;
    let passwordBase = passwordControl.value;
    if (passwordRepeat===passwordBase) {
      return null;
    }
    return {
      "PasswordRepetition":true
    };
  }
}
