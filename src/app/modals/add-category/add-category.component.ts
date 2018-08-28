import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "../../helpers/custom-validators";

@Component({
  selector: 'add-category-modal',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  modalTitle: string;
  newCategory: any;
  onAddCategoryEvn: any;
  userFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder) { 
    this.modalTitle = data.title;
    this.onAddCategoryEvn = new EventEmitter();
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
    this.newCategory = {
      "id" : 100,
      "name" : this.userFormGroup.value.name
    };
    var httpResultStatus = 1;
    var httpResultMsg = " was added.";
    var notificationObj = {
      "category" : this.newCategory,
      "status" : httpResultStatus,
      "msgStatus" : httpResultMsg,
      "classType" : "alert alert-success alert-with-icon"
    };
    this.onAddCategoryEvn.emit(notificationObj);
  }


}
