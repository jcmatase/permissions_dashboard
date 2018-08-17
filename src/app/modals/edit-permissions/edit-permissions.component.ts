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

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.modalTitle = data.title;
    this.user = data.user;
    this.onUpdatePermission = new EventEmitter();
  }

  ngOnInit() {
    this.displayedColumns = ['id', 'name', 'grant', 'deny'];
    this.setTestData();
    this.dataSource = new MatTableDataSource(this.permissions);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private setTestData() {
    this.permissions = [
        {id: 1, name: 'view_gateway', grant: true, deny: false},
        {id: 2, name: 'edit_gateway', grant: false, deny: true},
        {id: 3, name: 'view_permissions', grant: true, deny: false},
        {id: 4, name: 'edit_permissions', grant: false, deny: false},
        {id: 5, name: 'view_iso', grant: true, deny: false},
        {id: 6, name: 'edit_iso', grant: false, deny: false}
      ];
  }

  checkboxEvent (checkboxType, event) {
      console.log("checkboxType: " + checkboxType + " | " + "checked: " + event.checked);
      console.dir(this.clickedPermission);
      // Query db to update permission.
      // Show success or fail notificaction
      this.onUpdatePermission.emit(this.clickedPermission["name"]);
  }

  setClickedPermission(pRow){
    this.clickedPermission = pRow;
  }

}
