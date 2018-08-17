import {Component, Inject, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'edit-user-component',
  styleUrls: ['./edit-user.component.scss'],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  modalTitle: string;
  currentUser: any;
  updatedUser: any;
  onUpdateUser: any;
  email = new FormControl('', [Validators.email]);
  formErrors: boolean;
  username: string;
  password: string;
  name: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.currentUser = data.user;
    this.onUpdateUser = new EventEmitter();
    this.formErrors = false;
  }

  ngOnInit() {
  }

  getErrorMessage() {
      if(this.email.hasError('email')){
          this.formErrors = true;
          return 'username must be a valid email';
      }
      else{
          this.formErrors = false;
          return '';
      }
  }

  startEditingUser(usernameInput, passwordInput, nameInput) {
      var httpResultMsg, notificationObj;
      if(!this.formErrors){
          if(this.anyFieldToUpdate(usernameInput.value, passwordInput.value, nameInput.value)){
              usernameInput.value !== '' ? this.username = usernameInput.value : this.username = this.currentUser.username;
              passwordInput.value !== '' ? this.password = passwordInput.value : this.password = this.currentUser.username;
              nameInput.value !== '' ? this.name = nameInput.value : this.name = this.currentUser.name;
              // Query db to update user.
              // Show success or fail notificaction
              httpResultMsg = " was updated.";
              notificationObj = {
                  "username" : this.currentUser["username"],
                  "msgStatus" : httpResultMsg,
                  "classType" : "alert alert-success alert-with-icon"
              };
              this.updatedUser = {
                  "id" : this.currentUser["id"],
                  "username" : this.username,
                  "password" : this.password,
                  "name" : this.name
              };
              this.onUpdateUser.emit(notificationObj)
              console.log("update user: ");
              console.dir(this.updatedUser);
            }
            else{
                httpResultMsg = " nothing to update ";
                notificationObj = {
                    "username" : this.currentUser["username"],
                    "msgStatus" : httpResultMsg,
                    "classType" : "alert alert-warning alert-with-icon"
                };
                this.onUpdateUser.emit(notificationObj)
            }
      }
  }

  anyFieldToUpdate(usernameInput, passwordInput, nameInput) {
      if(usernameInput !== '' || passwordInput !== '' || nameInput !== ''){
          return true;
      }
      else{
          return false;
      }
  }

}
