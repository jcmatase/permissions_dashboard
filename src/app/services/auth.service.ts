import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserDetails(username, password) {
    //post these details to API server return user info if correct
    return this.http.post('/address/to/api/login', {
      username,
      password
    }).subscribe(data => {
      console.log(data, "is what we got from the server");
    });
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
}

}
