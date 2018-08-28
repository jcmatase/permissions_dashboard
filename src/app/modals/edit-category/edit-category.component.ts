import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "../../helpers/custom-validators";

@Component({
  selector: 'edit-category-modal',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  modalTitle: string;
  currentCategory: any;
  newCategory: any;
  onEditCategoryEvn: any;
  editCategoryFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder) { 
    this.modalTitle = data.title;
    this.currentCategory = data.category;
    this.onEditCategoryEvn = new EventEmitter();
  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.editCategoryFormGroup = this.formBuilder.group({
      'name': this.formBuilder.control('', Validators.required)
    });
  }

  get name() {
    return this.editCategoryFormGroup.get('name');
  }

  handleSubmit() {
    alert("Values are correct. Let's validate them");
    this.newCategory = {
      "id" : this.currentCategory["id"],
      "name" : this.editCategoryFormGroup.value.name
    };
    var httpResultStatus = 1;
    var httpResultMsg = " was updated.";
    var notificationObj = {
      "category" : this.newCategory,
      "status" : httpResultStatus,
      "msgStatus" : httpResultMsg,
      "classType" : "alert alert-success alert-with-icon"
    };
    this.onEditCategoryEvn.emit(notificationObj);
  }


}
