import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private baseURL = 'api/users/authenticate';
  success = 0;
  loading = false;
  result = {};

  constructor(private http: HttpClient) { }

  getUserDetails(username, password) {
    //post these details to API server return user info if correct
    return this.http.post(this.baseURL, {username, password
    }).subscribe(data => {
      console.log(data, "is what we got from the server");
      this.success = 1;
      this.loading = false;
      this.result = data;
      //localStorage.setItem('currentUser', JSON.stringify(user));
    },
    error => {
      this.success = 0;
      this.loading = false;
      this.result = {};
    });
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
  }

}
