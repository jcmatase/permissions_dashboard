import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  private baseURL = 'http://localhost:8080/master-api/login';
  success = 0;
  loading = false;
  result = {};

  constructor(private http: Http) { }

  getUserDetails(username: string, password: string) {
    return this.http.post( this.baseURL, { username: username, password: password })
        .map((response: Response) => {
            // login successful
            console.error('No user Error');
            let user = response.json();
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }else{
                console.log('No user Error');
            }
            return user;
        },
        error => {
            console.log('Error' + error);
        });
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
  }

}
