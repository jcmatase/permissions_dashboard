import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "../../helpers/custom-validators";

@Component({
  selector: 'edit-role-modal',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  modalTitle: string;
  currentRole: any;
  newRole: any;
  onEditRoleEvn: any;
  editRoleFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder) { 
    this.modalTitle = data.title;
    this.currentRole = data.role;
    this.onEditRoleEvn = new EventEmitter();
  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.editRoleFormGroup = this.formBuilder.group({
      'name': this.formBuilder.control('', Validators.required)
    });
  }

  get name() {
    return this.editRoleFormGroup.get('name');
  }

  handleSubmit() {
    alert("Values are correct. Let's validate them");
    this.newRole = {
      "id" : this.currentRole["id"],
      "name" : this.editRoleFormGroup.value.name
    };
    var httpResultStatus = 1;
    var httpResultMsg = " was updated.";
    var notificationObj = {
      "role" : this.newRole,
      "status" : httpResultStatus,
      "msgStatus" : httpResultMsg,
      "classType" : "alert alert-success alert-with-icon"
    };
    this.onEditRoleEvn.emit(notificationObj);
  }


}
