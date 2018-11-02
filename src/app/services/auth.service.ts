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
            let responseBody = JSON.parse(response["_body"]);
            if(responseBody.data && responseBody.data.status === "success" && responseBody.data.token){
                localStorage.setItem('currentUser', JSON.stringify({"user" : responseBody.data.user, "token" : responseBody.data.token}));
                return response;
            }
            else{
                console.error("Invalid response");
                return response;
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
