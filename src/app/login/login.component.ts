import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormGroup: FormGroup;
  loading = false;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private toastr: ToastrService, private router: Router, 
              private formBuilder: FormBuilder, private Auth: AuthService) { 
  }

  ngOnInit() {
    this.Auth.logout();
    this.initFormGroup();
  }

  initFormGroup() {
    this.userFormGroup = this.formBuilder.group({
      'username': this.formBuilder.control('', Validators.required),
      'password': this.formBuilder.control('', Validators.required)
    });
  }

  get username() {
    return this.userFormGroup.get('username');
  }

  get password() {
    return this.userFormGroup.get('password');
  }

  private showNotification(from, align, msg1, boldMsg, msg2, classType) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>' + msg1 + '<b>' + boldMsg + '</b> ' + msg2 , '', {
      timeOut: 2000,
      closeButton: true,
      enableHtml: true,
      toastClass: classType,
      positionClass: 'toast-' + from + '-' +  align
    });
  }

  private redirectToUserspage(){
    this.router.navigate(['/users']);
  }

  private validateloginMsgToDisplay(validResponse, response){
    var user = this.username.value;
    if(validResponse){
      if(response.data && response.data.status === "success" && response.data.token){
        this.showNotification('top', 'right', "User: ", user, " has been logged in", "alert alert-success alert-with-icon");
        this.redirectToUserspage();
      }
      if(response.data && response.data.status === "failure" && response.data.message === "Invalid User / Password"){
        this.showNotification('top', 'right', "Failure: ", "", "Invalid User / Password", "alert alert-warning alert-with-icon");
      }
    }
    else{
      this.showNotification('top', 'right', "Failure: ", "", "Invalid Request", "alert alert-danger alert-with-icon");
    }
  }
  
  loginUser() {
    this.spinnerService.show();
    this.Auth.getUserDetails(this.username.value, this.password.value)
      .subscribe(
        data => {
          this.spinnerService.hide();
          console.warn('Login ok');
          this.validateloginMsgToDisplay(true, JSON.parse(data["_body"]));
        },
        error => {
          this.spinnerService.hide();
          console.error("Error trying to login");
          this.validateloginMsgToDisplay(false, null);
        })
  }


}
