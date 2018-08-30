import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "../../helpers/custom-validators";

@Component({
  selector: 'add-permission-modal',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {

  modalTitle: string;
  newPermission: any;
  onAddPermissionEvn: any;
  userFormGroup: FormGroup;
  availablePermissionCategories: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder) { 
    this.modalTitle = data.title;
    this.availablePermissionCategories = data.availablePermissionCategories;
    this.onAddPermissionEvn = new EventEmitter();
  }

  ngOnInit() {
    this.initFormGroup();
    console.dir(this.availablePermissionCategories);
    // add dropdown field with this.availablePermissionCategories
  }

  initFormGroup() {
    this.userFormGroup = this.formBuilder.group({
      'permissionName': this.formBuilder.control('', Validators.required)
    });
  }

  get permissionName() {
    return this.userFormGroup.get('permissionName');
  }

  handleSubmit() {
    alert("Values are correct. Let's validate them");
    this.newPermission = {
      "permissionID" : 100,
      "permissionName" : this.userFormGroup.value.permissionName
    };
    var httpResultStatus = 1;
    var httpResultMsg = " was added.";
    var notificationObj = {
      "permission" : this.newPermission,
      "status" : httpResultStatus,
      "msgStatus" : httpResultMsg,
      "classType" : "alert alert-success alert-with-icon"
    };
    this.onAddPermissionEvn.emit(notificationObj);
  }


}
