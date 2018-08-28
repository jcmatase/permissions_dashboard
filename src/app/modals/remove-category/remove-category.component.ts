import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'remove-user-modal',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.scss']
})
export class RemoveCategoryComponent implements OnInit {

  modalTitle: string;
  category: any;
  onRemoveCategoryEvn: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.category = data.category;
    this.onRemoveCategoryEvn = new EventEmitter();
  }

  ngOnInit() {
  }

  startRemovingUser() {
    console.log("remove category: ");
    console.log(this.category);
    // Query db to remove user.
    // Show success or fail notificaction
    var httpResultStatus = 1;
    var httpResultMsg = " was removed.";
    var notificationObj = {
      "category" : this.category,
      "status" : httpResultStatus,
      "msgStatus" : httpResultMsg,
      "classType" : "alert alert-success alert-with-icon"
    };
    this.onRemoveCategoryEvn.emit(notificationObj);
  }

}
