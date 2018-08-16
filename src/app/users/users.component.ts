import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { MatDialog, MatDialogConfig, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AddUserComponent } from '../modals/add-user/add-user.component';
import { RemoveUserComponent } from '../modals/remove-user/remove-user.component';

@Component({
  selector: 'users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: []
})
export class UsersComponent implements OnInit {

  users: Array<any>;

  constructor(private toastr: ToastrService, public dialog: MatDialog, public removeUserDialog: MatDialog) { }

  ngOnInit() {
    this.setTestData();
  }

  private setTestData(){
    this.users = [
      {
          "user_id" : 1,
          "username" : "jean.mata@bvmedia.cr",
          "password" : "ojaisbt67tr751397Jgs74rhBf",
          "name" : "Jean Carlo Mata"
      },
      {
          "user_id" : 2,
          "username" : "ariel@onpoint.com",
          "password" : "jajsJHVhvjhgsvjJSCJhv871872613b",
          "name" : "Ariel Dayan"
      },
      {
          "user_id" : 3,
          "username" : "chucky@onpoint.com",
          "password" : "ojaisbt67tr751397Jgs74rhBf",
          "name" : "Charles Ohana"
      },
      {
          "user_id" : 4,
          "username" : "mainor.miranda@bvmedia.cr",
          "password" : "ojaisbt67tr751397Jgs74rhBf",
          "name" : "Mainor Miranda"
      },
      {
          "user_id" : 4,
          "username" : "charlie@onpoint.com",
          "password" : "ojaisbt67tr751397Jgs74rhBf",
          "name" : "Charlie Brown"
      }
    ];
  }

  showNotification(from, align) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-info alert-with-icon",
      positionClass: 'toast-' + from + '-' +  align
    });
  }

  openAddUserModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "350px";
    dialogConfig.height = "315px";
    dialogConfig.data = {
      id: 1,
      title: "Add User"
    };
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    dialogConfig.position = {
      top: '0',
      left: '0'
    };

    dialogRef.afterClosed().subscribe(result => {
    });

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }

  openRemoveUserModal(pUser) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.height = "225px";
    dialogConfig.data = {
      id: 2,
      title: "Are you sure you want to remove user: ",
      user: pUser
    };
    const dialogRef = this.removeUserDialog.open(RemoveUserComponent, dialogConfig);
    dialogConfig.position = {
      top: '0',
      left: '0'
    };

    dialogRef.afterClosed().subscribe(result => {
    });

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }
  
}
