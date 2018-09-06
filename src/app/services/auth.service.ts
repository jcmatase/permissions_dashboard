import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  getUserDetails() {
    //post these details to API server return user info if correct
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
}

}
