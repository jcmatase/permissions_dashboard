import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddUserComponent } from '../modals/add-user/add-user.component';
import { RemoveUserComponent } from '../modals/remove-user/remove-user.component';
import { EditPermissionsComponent } from '../modals/edit-permissions/edit-permissions.component';

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

  showNotification(from, align, msg1, boldMsg, msg2) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>' + msg1 + '<b>' + boldMsg + '</b> ' + msg2 , '', {
      timeOut: 2000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-' + from + '-' +  align
    });
  }


  //                _     _   _    _                 __  __           _       _ 
  //       /\      | |   | | | |  | |               |  \/  |         | |     | |
  //      /  \   __| | __| | | |  | |___  ___ _ __  | \  / | ___   __| | __ _| |
  //     / /\ \ / _` |/ _` | | |  | / __|/ _ \ '__| | |\/| |/ _ \ / _` |/ _` | |
  //    / ____ \ (_| | (_| | | |__| \__ \  __/ |    | |  | | (_) | (_| | (_| | |
  //   /_/    \_\__,_|\__,_|  \____/|___/\___|_|    |_|  |_|\___/ \__,_|\__,_|_|
  //                                                                            
  //                                                                            
  
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

  //    _____                                 _    _                 __  __           _       _ 
  //   |  __ \                               | |  | |               |  \/  |         | |     | |
  //   | |__) |___ _ __ ___   _____   _____  | |  | |___  ___ _ __  | \  / | ___   __| | __ _| |
  //   |  _  // _ \ '_ ` _ \ / _ \ \ / / _ \ | |  | / __|/ _ \ '__| | |\/| |/ _ \ / _` |/ _` | |
  //   | | \ \  __/ | | | | | (_) \ V /  __/ | |__| \__ \  __/ |    | |  | | (_) | (_| | (_| | |
  //   |_|  \_\___|_| |_| |_|\___/ \_/ \___|  \____/|___/\___|_|    |_|  |_|\___/ \__,_|\__,_|_|
  //                                                                                            
  //                                                                                            

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

    dialogRef.componentInstance.onRemoveEvn.subscribe(userName => {
      this.showNotification('top', 'right', "User: ", userName, " was removed");
      dialogRef.close();
    });
  }
  
  //    ______    _ _ _     _____                    _         _                   __  __           _       _ 
  //   |  ____|  | (_) |   |  __ \                  (_)       (_)                 |  \/  |         | |     | |
  //   | |__   __| |_| |_  | |__) |__ _ __ _ __ ___  _ ___ ___ _  ___  _ __  ___  | \  / | ___   __| | __ _| |
  //   |  __| / _` | | __| |  ___/ _ \ '__| '_ ` _ \| / __/ __| |/ _ \| '_ \/ __| | |\/| |/ _ \ / _` |/ _` | |
  //   | |___| (_| | | |_  | |  |  __/ |  | | | | | | \__ \__ \ | (_) | | | \__ \ | |  | | (_) | (_| | (_| | |
  //   |______\__,_|_|\__| |_|   \___|_|  |_| |_| |_|_|___/___/_|\___/|_| |_|___/ |_|  |_|\___/ \__,_|\__,_|_|
  //                                                                                                          
  //                                                                                                          

  openEditPermissionsModal(pUser) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.height = "400px";
    dialogConfig.data = {
      id: 3,
      title: "User Permissions for: ",
      user: pUser
    };
    const dialogRef = this.removeUserDialog.open(EditPermissionsComponent, dialogConfig);
    dialogConfig.position = {
      top: '0',
      left: '0'
    };

    dialogRef.afterClosed().subscribe(result => {
    });

    dialogRef.componentInstance.onUpdatePermission.subscribe(permissionName => {
      this.showNotification('top', 'right', "Permission: ", permissionName, " was updated");
    });

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }
  
}
