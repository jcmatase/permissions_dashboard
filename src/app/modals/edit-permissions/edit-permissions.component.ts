import {Component, Inject, EventEmitter} from '@angular/core';
import {MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';

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
  permissioncCategoryMap: Map<number, string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.user = data.user;
    this.onUpdatePermission = new EventEmitter();
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'grant', 'deny'];
    this.setPermissionsInfo();
    // populate permissions map
    this.dataSource = new MatTableDataSource(this.permissions);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private setPermissionsInfo() {
    this.permissions = [
        {id: 1, name: 'view_gateway', category_id: 1, grant: true, deny: false},
        {id: 2, name: 'edit_gateway', category_id: 1, grant: false, deny: true},
        {id: 3, name: 'view_finance', category_id: 2, grant: true, deny: false},
        {id: 4, name: 'edit_finance', category_id: 2, grant: false, deny: false},
        {id: 5, name: 'view_iso', category_id: 3, grant: true, deny: false},
        {id: 6, name: 'edit_iso', category_id: 3, grant: false, deny: false},
        {id: 6, name: 'view_permissions', category_id: 4, grant: false, deny: false}
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
