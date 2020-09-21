import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UniversalService } from '../_universal/universal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UniversalService{

  constructor(
    private http: HttpClient) { 
      super();
  }
}
