import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: []
})
export class UsersComponent implements OnInit {

  users: Array<any>;

  constructor(private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit() {
    this.setTestData();
  }

  private setTestData(){
    this.users = [
      {
          "username" : "jean.mata@bvmedia.cr",
          "password" : "ojaisbt67tr751397Jgs74rhBf"
      },
      {
          "username" : "ariel@onpoint.com",
          "password" : "jajsJHVhvjhgsvjJSCJhv871872613b"
      },
      {
          "username" : "chucky@onpoint.com",
          "password" : "ojaisbt67tr751397Jgs74rhBf"
      },
      {
          "username" : "mainor.miranda@bvmedia.cr",
          "password" : "ojaisbt67tr751397Jgs74rhBf"
      },
      {
          "username" : "charlie@onpoint.com",
          "password" : "ojaisbt67tr751397Jgs74rhBf"
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

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: "Angular For Beginners"
    };
    const dialogRef = this.dialog.open(MyDialogComponent, dialogConfig);
    dialogConfig.position = {
      top: '0',
      left: '0'
  };
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed");
      console.log(result)
    });
  }

}
