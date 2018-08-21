import {Component, Inject, EventEmitter} from '@angular/core';
import {MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';
import { filter } from 'rxjs-compat/operator/filter';

export interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'table-filtering-example',
  styleUrls: ['./edit-permissions.component.scss'],
  templateUrl: './edit-permissions.component.html',
})
export class EditPermissionsComponent {

  displayedColumns: string[];
  dataSource: any;
  permissions: object[];
  clickedPermission: {};
  modalTitle: string;
  user: any;
  onUpdatePermission: any;
  grantCheckbox: boolean;
  denyCheckbox: boolean;
  permissionsMap: any;
  permissionCategories: any[] = [];
  permissionIds: number[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.user = data.user;
    this.onUpdatePermission = new EventEmitter();
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'category_name', 'grant', 'deny'];
    this.setPermissionsInfo();
    this.populatePermissionsMap();
    this.dataSource = new MatTableDataSource(this.permissions);
  }

  populatePermissionsMap() {
    for(var permissionCounter = 0; permissionCounter < this.permissions.length; permissionCounter++){
      let currentCategoryID = this.permissions[permissionCounter]['category_id'];
      let addElement = this.existCategoryLocally(currentCategoryID);
      if(addElement === -1) {
        let currentCategoryName = this.permissions[permissionCounter]['category_name'];
        this.permissionCategories.push({
          id: currentCategoryID,
          name: currentCategoryName
        });
        this.permissionIds.push(currentCategoryID);
      }
    }
  }

  existCategoryLocally(pCategoryID) {
    return this.permissionIds.indexOf(pCategoryID);
  }

  applyCategoryFilter(filterValue) {
    this.dataSource.filter = filterValue;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private setPermissionsInfo() {
    this.permissions = [
        {id: 1, name: 'view_gateway', category_id: 1, category_name: "Krobots", grant: true, deny: false},
        {id: 2, name: 'edit_gateway', category_id: 1, category_name: "Krobots", grant: false, deny: true},
        {id: 3, name: 'view_finance', category_id: 2, category_name: "Finance", grant: true, deny: false},
        {id: 4, name: 'edit_finance', category_id: 2, category_name: "Finance", grant: false, deny: false},
        {id: 5, name: 'view_iso', category_id: 3, category_name: "ISO", grant: true, deny: false},
        {id: 6, name: 'edit_iso', category_id: 3, category_name: "ISO", grant: false, deny: false},
        {id: 7, name: 'view_permissions', category_id: 4, category_name: "Permissions", grant: false, deny: false}
      ];
  }

  handleCheckUncheck(permission, checkbox, event){
    if(event && checkbox === "grantEvent"){
      permission["deny"] = false;
    }
    if(event && checkbox === "denyEvent"){
      permission["grant"] = false;
    }
  }

  checkboxEvent (checkboxType, event) {
      console.log("checkboxType: " + checkboxType + " | " + "checked: " + event.checked);
      this.handleCheckUncheck(this.clickedPermission, checkboxType, event.checked);
      console.dir(this.clickedPermission);
      // Query db to update permission.
      // Show success or fail notificaction
      var httpResultMsg = " was updated.";
      var notificationObj = {
          "permissionName" : this.clickedPermission["name"],
          "msgStatus" : httpResultMsg,
          "classType" : "alert alert-success alert-with-icon"
      };
      this.onUpdatePermission.emit(notificationObj);
  }

  setClickedPermission(pRow){
    this.clickedPermission = pRow;
  }

}
