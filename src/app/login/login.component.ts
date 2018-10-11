import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private Auth: AuthService) { 
  }

  ngOnInit() {
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

  loginUser() {
    this.Auth.getUserDetails(this.username.value, this.password.value);
    console.log("username: " + this.username.value, "password: " + this.password.value);
  }


}
