import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "../../helpers/custom-validators";

@Component({
  selector: 'add-role-modal',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  modalTitle: string;
  newRole: any;
  onAddRoleEvn: any;
  userFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder) { 
    this.modalTitle = data.title;
    this.onAddRoleEvn = new EventEmitter();
  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.userFormGroup = this.formBuilder.group({
      'name': this.formBuilder.control('', Validators.required)
    });
  }

  get name() {
    return this.userFormGroup.get('name');
  }

  handleSubmit() {
    alert("Values are correct. Let's validate them");
    this.newRole = {
      "id" : 100,
      "name" : this.userFormGroup.value.name
    };
    var httpResultStatus = 1;
    var httpResultMsg = " was added.";
    var notificationObj = {
      "role" : this.newRole,
      "status" : httpResultStatus,
      "msgStatus" : httpResultMsg,
      "classType" : "alert alert-success alert-with-icon"
    };
    this.onAddRoleEvn.emit(notificationObj);
  }


}
