import {Component, Inject, EventEmitter} from '@angular/core';
import {MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'edit-roles-component',
  styleUrls: ['./edit-roles.component.scss'],
  templateUrl: './edit-roles.component.html',
})
export class EditUserRolesComponent {

  displayedColumns: string[];
  dataSource: any;
  roles: object[];
  clickedRole: {};
  modalTitle: string;
  user: any;
  onUpdateRole: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.user = data.user;
    this.onUpdateRole = new EventEmitter();
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'status'];
    this.setRolesInfo();
    this.dataSource = new MatTableDataSource(this.roles);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private setRolesInfo() {
    this.roles = [
        {id: 1, name: 'admin', status: true},
        {id: 2, name: 'finance', status: false},
        {id: 3, name: 'permissions_management', status: true}
    ];
  }

  checkboxEvent (event) {
      console.log("checked: " + event.checked);
      console.dir(this.clickedRole);
      // Query db to update permission.
      // Show success or fail notificaction
      var httpResultMsg = " was updated.";
      var notificationObj = {
          "roleName" : this.clickedRole["name"],
          "msgStatus" : httpResultMsg,
          "classType" : "alert alert-success alert-with-icon"
      };
      this.onUpdateRole.emit(notificationObj);
  }

  setClickedRole(pRow){
    this.clickedRole = pRow;
  }

}
