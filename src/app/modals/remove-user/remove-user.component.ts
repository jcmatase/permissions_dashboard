import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'remove-user-modal',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss']
})
export class RemoveUserComponent implements OnInit {

  modalTitle: string;
  user: any;
  onRemoveEvn: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.user = data.user;
    this.onRemoveEvn = new EventEmitter();
  }

  ngOnInit() {
  }

  startRemovingUser() {
    console.log("remove user: ");
    console.log(this.user);
    // Query db to update permission.
    // Show success or fail notificaction
    this.onRemoveEvn.emit(this.user["name"]);
  }

}
