import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'add-user-modal',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  modalTitle: string;
  newUser: any;
  onAddEvn: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.onAddEvn = new EventEmitter();
  }

  ngOnInit() {
  }

  startSavingUser(pUserNameInput, pPasswordInput, pNameInput) {
    this.newUser = {
        "id" : 100,
        "username" : pUserNameInput.value,
        "password" : pPasswordInput.value,
        "name" : pNameInput.value
    };
    // Query db to add user
    // Query db needs to return success if user dosn't exist and connection was succesful. I will return the new user data from db
    // If success add user to users table and show notification
    var httpResultMsg = " was added.";
    var notificationObj = {
        "user" : this.newUser,
        "msgStatus" : httpResultMsg,
        "classType" : "alert alert-success alert-with-icon"
    };
    this.onAddEvn.emit(notificationObj);
  }

  printUserInfo() {
    console.log(this.newUser);
  }


}
