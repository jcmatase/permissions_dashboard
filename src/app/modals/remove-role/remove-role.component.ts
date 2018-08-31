import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'remove-user-modal',
  templateUrl: './remove-role.component.html',
  styleUrls: ['./remove-role.component.scss']
})
export class RemoveRoleComponent implements OnInit {

  modalTitle: string;
  role: any;
  onRemoveRoleEvn: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.role = data.role;
    this.onRemoveRoleEvn = new EventEmitter();
  }

  ngOnInit() {
  }

  startRemovingUser() {
    console.log("remove role: ");
    console.log(this.role);
    // Query db to remove user.
    // Show success or fail notificaction
    var httpResultStatus = 1;
    var httpResultMsg = " was removed.";
    var notificationObj = {
      "role" : this.role,
      "status" : httpResultStatus,
      "msgStatus" : httpResultMsg,
      "classType" : "alert alert-success alert-with-icon"
    };
    this.onRemoveRoleEvn.emit(notificationObj);
  }

}
