import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'edit-permission-modal',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss']
})
export class EditPermissionComponent implements OnInit {

  modalTitle: string;
  newPermission: any;
  currentPermission: any;
  onEditPermissionEvn: any;
  userFormGroup: FormGroup;
  availablePermissionCategories: any;
  currentPermissionCategory:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder) { 
    this.modalTitle = data.title;
    this.availablePermissionCategories = data.availablePermissionCategories;
    this.currentPermission = data.currentPermission;
    this.onEditPermissionEvn = new EventEmitter();
    this.availablePermissionCategories = data.availablePermissionCategories;
    this.currentPermissionCategory = this.setCurrentPermissionCategory();
  }

  ngOnInit() {
      this.initFormGroup();
  }

  setCurrentPermissionCategory() {
      var currentPermissionCategoryID = this.currentPermission.categoryID;
      var currentPermissionCategoryName = this.currentPermission.categoryName;
      return {id: currentPermissionCategoryID, name: currentPermissionCategoryName};
  }

  initFormGroup() {
    this.userFormGroup = this.formBuilder.group({
      'permissionName': this.formBuilder.control('', []),
      'permissionCategory': this.formBuilder.control('', [])
    });
  }

  get permissionName() {
    return this.userFormGroup.get('permissionName');
  }

  get permissionCategory() {
    return this.userFormGroup.get('permissionCategory');
  }

  printSelectedCategoryValue(value) {
    console.dir(value);
  }

  emptyNewPermissionValues(pName, pPermissionCategory) {
      if(pName === '' && pPermissionCategory === ''){
          return true;
      }
      else{
          return false;
      }
  }

  handleSubmit() {
      var httpResultStatus = 0;
      var httpResultMsg = " wasn't updated.";
      var classType = "alert alert-danger alert-with-icon"

      if(this.emptyNewPermissionValues(this.userFormGroup.value.permissionName, this.userFormGroup.value.permissionCategory)) {
          httpResultStatus = 100;
          httpResultMsg = "Nothing to update";
          classType = "alert alert-warning alert-with-icon";
      }
      else {
        alert("Values are correct. Let's validate them");
        httpResultStatus = 1;
        httpResultMsg = " was updated.";
        classType = "alert alert-success alert-with-icon";
      }
            
      var notificationObj = {
          "permission" : this.currentPermission,
          "newPermissionName" : this.userFormGroup.value.permissionName,
          "newPermissionCategory" : this.userFormGroup.value.permissionCategory,
          "status" : httpResultStatus,
          "msgStatus" : httpResultMsg,
          "classType" : classType
      };
      this.onEditPermissionEvn.emit(notificationObj);
  }


}
