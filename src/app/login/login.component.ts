import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
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

  handleSubmit() {
    console.log(this.username, this.password);
  }


}
