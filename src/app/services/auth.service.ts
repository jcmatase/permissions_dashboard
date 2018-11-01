import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  private baseURL = '/master-api/login';
  success = 0;
  loading = false;
  result = {};

  constructor(private http: Http) { }

  getUserDetails(username: string, password: string) {
    return this.http.post( this.baseURL, { user: username, password: password })
        .map((response: Response) => {
            // login successful
            let data = JSON.parse(response["_body"]);
            if(data && data.data.success && data.data.user && data.data.JWT){
                localStorage.setItem('currentUser', JSON.stringify({"user" : data.data.user, "token" : data.data.JWT}));
            }
            else{
                console.error("Invalid response");
            }
        },
        error => {
            console.log('Error' + error);
        });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
