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

  startEditingUser(usernameInput, emailInput, passwordInput, confirmPasswordInput, nameInput, notificationObj){
    this.username = usernameInput.value;
    this.email = emailInput.value;
    this.password = passwordInput.value;
    this.name = nameInput.value;                            
    // Query db to update user.
    // Show success or fail notificaction (1, 0)
    this.updatedUser = {
        "id" : this.currentUser["id"],
        "username" : this.username,
        "email" : this.email,
        "password" : this.password,
        "name" : this.name
    };
    notificationObj = this.setNotificationObj(1, " was updated.", "alert alert-success alert-with-icon");
    this.onUpdateUser.emit(notificationObj)
    console.log("update user: ");
    console.dir(this.updatedUser);
  }

  validateUserInputs(usernameInput, emailInput, passwordInput, confirmPasswordInput, nameInput) {
      var notificationObj;
      if(!this.formErrors){
          if(this.anyFieldToUpdate(usernameInput.value, emailInput.value, passwordInput.value, confirmPasswordInput.value, nameInput.value)){
              if(this.passwordsMatching(passwordInput, confirmPasswordInput)){
                this.startEditingUser(usernameInput, emailInput, passwordInput, confirmPasswordInput, nameInput, notificationObj);
              }else{
                  // 100 to now show user
                  notificationObj = this.setNotificationObj(100, "Please make sure your passwords match.", "alert alert-danger alert-with-icon");
                  this.onUpdateUser.emit(notificationObj);
              }
            }
            else{
                notificationObj = this.setNotificationObj(100, "Nothing to update", "alert alert-warning alert-with-icon");
                this.onUpdateUser.emit(notificationObj);
            }
      }
  }

  setNotificationObj(httpResultStatus, httpResultMsg, classType){
      var notificationObj = {};
      notificationObj = {
        "status" : httpResultStatus,
        "msgStatus" : httpResultMsg,
        "username" : this.currentUser["username"],
        "classType" : classType
      };
      return notificationObj;
  }

  anyFieldToUpdate(usernameInput, emailInput, passwordInput, confirmPasswordInput, nameInput) {
      if(usernameInput !== '' || emailInput !== '' || passwordInput !== '' || nameInput !== '' || confirmPasswordInput !== ''){
          return true;
      }
      else{
          return false;
      }
  }

  passwordsMatching(passwordInput, confirmPasswordInput){
      if(passwordInput.value === confirmPasswordInput.value) {
          return true;
      }
      else{
          return false;
      }
  }

}
