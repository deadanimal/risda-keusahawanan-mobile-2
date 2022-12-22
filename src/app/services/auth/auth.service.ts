import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData{
  success: boolean,
  message: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')

  constructor(private httpClient: HttpClient) { }


  setLoggedInStatus(value: boolean){
    this.loggedInStatus = value

    localStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString())
  }
}
