import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';


import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from '../modals/add-user/add-user.component';

@Component({
  selector: 'users-list',
  templateUrl: './permission_category.component.html',
  styleUrls: ['./permission_category.component.css'],
  providers: []
})
export class PermissionCategoryComponent implements OnInit {

  permissionCategories: Array<any>;
  displayedColumns: string[];
  dataSource: any;

  constructor() { }

  ngOnInit() {
      this.displayedColumns = ['name', 'edit', 'remove'];
      this.setPermissionCategoriesInfo();
      this.dataSource = new MatTableDataSource(this.permissionCategories);
  }

  setPermissionCategoriesInfo() {
      this.permissionCategories = [
          {id: 1, name: "Krobots"},
          {id: 2, name: "Permissions"},
          {id: 3, name: "Finance"}
      ];
  }

  openAddCategory(){

  }

}
