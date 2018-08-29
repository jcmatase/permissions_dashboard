import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'remove-user-modal',
  templateUrl: './remove-permission.component.html',
  styleUrls: ['./remove-permission.component.scss']
})
export class RemovePermissionComponent implements OnInit {

  modalTitle: string;
  permission: any;
  onRemovePermissionEvn: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.permission = data.permission;
    this.onRemovePermissionEvn = new EventEmitter();
  }

  ngOnInit() {
  }

  startRemovingPermission() {
    console.log("remove permission: ");
    console.log(this.permission);
    // Query db to remove permission
    // Show success or fail notificaction
    var httpResultStatus = 1;
    var httpResultMsg = " was removed.";
    var notificationObj = {
      "permission" : this.permission,
      "status" : httpResultStatus,
      "msgStatus" : httpResultMsg,
      "classType" : "alert alert-success alert-with-icon"
    };
    this.onRemovePermissionEvn.emit(notificationObj);
  }

}
