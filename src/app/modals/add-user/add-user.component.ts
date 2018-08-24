import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "../../helpers/custom-validators";

@Component({
  selector: 'add-user-modal',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  modalTitle: string;
  newUser: any;
  onAddEvn: any;
  userFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder) { 
    this.modalTitle = data.title;
    this.onAddEvn = new EventEmitter();
  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.userFormGroup = this.formBuilder.group({
      'username': this.formBuilder.control('',Validators.required),
      'password': this.formBuilder.control('', Validators.required),
      'confirmPassword': this.formBuilder.control('', Validators.required),
      'email': this.formBuilder.control('', Validators.email),
      'name': this.formBuilder.control('', Validators.required)
    }, {
      validator: CustomValidators.MatchPassword
    });
  }

  get username() {
    return this.userFormGroup.get('username');
  }

  get password() {
    return this.userFormGroup.get('password');
  }

  get confirmPassword() {
    return this.userFormGroup.get('confirmPassword');
  }

  get email() {
    return this.userFormGroup.get('email');
  }

  get name() {
    return this.userFormGroup.get('name');
  }

  handleSubmit() {
    alert("Values are correct. Let's validate them");
    this.newUser = {
      "id" : 100,
      "username" : this.userFormGroup.value.username,
      "email" : this.userFormGroup.value.email,
      "password" : this.userFormGroup.value.password,
      "name" : this.userFormGroup.value.name
    };
    console.dir(this.newUser);
    var httpResultStatus = 1;
    var httpResultMsg = " was added.";
    var notificationObj = {
      "user" : this.newUser,
      "status" : httpResultStatus,
      "msgStatus" : httpResultMsg,
      "classType" : "alert alert-success alert-with-icon"
    };
    this.onAddEvn.emit(notificationObj);
  }


}
