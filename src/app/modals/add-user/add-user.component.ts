import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'add-user-modal',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  modalTitle: string;
  newUser: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
  }

  ngOnInit() {
  }

  startSavingUser(pUserNameInput, pPasswordInput, pNameInput) {
    this.newUser = {
        "username" : pUserNameInput.value,
        "password" : pPasswordInput.value,
        "name" : pNameInput.value
    };
    this.printUserInfo();
  }

  printUserInfo() {
    console.log(this.newUser);
  }


}
