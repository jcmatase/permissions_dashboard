import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddUserComponent } from '../modals/add-user/add-user.component';
import { RemoveUserComponent } from '../modals/remove-user/remove-user.component';
import { EditPermissionsComponent } from '../modals/edit-permissions/edit-permissions.component';
import { EditRolesComponent } from '../modals/edit-roles/edit-roles.component';
import { EditUserComponent } from '../modals/edit-user/edit-user.component';

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
    this.setUsersInfo();
  }

  private setUsersInfo(){
    this.users = [
      {
          "id" : 1,
          "username" : "jean.mata@bvmedia.cr",
          "password" : "ojaisbt67tr751397Jgs74rhBf",
          "name" : "Jean Carlo Mata"
      },
      {
          "id" : 2,
          "username" : "ariel@onpoint.com",
          "password" : "jajsJHVhvjhgsvjJSCJhv871872613b",
          "name" : "Ariel Dayan"
      },
      {
          "id" : 3,
          "username" : "chucky@onpoint.com",
          "password" : "ojaisbt67tr751397Jgs74rhBf",
          "name" : "Charles Ohana"
      },
      {
          "id" : 4,
          "username" : "mainor.miranda@bvmedia.cr",
          "password" : "ojaisbt67tr751397Jgs74rhBf",
          "name" : "Mainor Miranda"
      },
      {
          "id" : 5,
          "username" : "charlie@onpoint.com",
          "password" : "ojaisbt67tr751397Jgs74rhBf",
          "name" : "Charlie Brown"
      }
    ];
  }

  private showNotification(from, align, msg1, boldMsg, msg2, classType) {
    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>' + msg1 + '<b>' + boldMsg + '</b> ' + msg2 , '', {
      timeOut: 2000,
      closeButton: true,
      enableHtml: true,
      toastClass: classType,
      positionClass: 'toast-' + from + '-' +  align
      //toastClass: "alert alert-success alert-with-icon",
    });
  }

  private removeUserFromArray(id) {
    for(var userCounter = 0; userCounter < this.users.length; userCounter++){
      if(this.users[userCounter]["id"] === id){
        this.users.splice(userCounter, 1);
        return;
      }
    }
  }

  private addUserToArray(newUser) {
    this.users.push(newUser);
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

    dialogRef.componentInstance.onAddEvn.subscribe(notificationObj => {
      this.addUserToArray(notificationObj["user"]);
      this.showNotification('top', 'right', "User: ", notificationObj["user"]["name"], notificationObj["msgStatus"], notificationObj["classType"]);
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

    dialogRef.componentInstance.onRemoveEvn.subscribe(notificationObj => {
      this.removeUserFromArray(notificationObj["id"]);
      this.showNotification('top', 'right', "User: ", notificationObj["userName"], notificationObj["msgStatus"], notificationObj["classType"]);
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

    dialogRef.componentInstance.onUpdatePermission.subscribe(notificationObj => {
      this.showNotification('top', 'right', "Permission: ", notificationObj["permissionName"], notificationObj["msgStatus"], notificationObj["classType"]);
    });

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }

  //    ______    _ _ _     _____       _             __  __           _       _ 
  //   |  ____|  | (_) |   |  __ \     | |           |  \/  |         | |     | |
  //   | |__   __| |_| |_  | |__) |___ | | ___  ___  | \  / | ___   __| | __ _| |
  //   |  __| / _` | | __| |  _  // _ \| |/ _ \/ __| | |\/| |/ _ \ / _` |/ _` | |
  //   | |___| (_| | | |_  | | \ \ (_) | |  __/\__ \ | |  | | (_) | (_| | (_| | |
  //   |______\__,_|_|\__| |_|  \_\___/|_|\___||___/ |_|  |_|\___/ \__,_|\__,_|_|
  //                                                                             
  //                                                                             

  
  openEditRolesModal(pUser) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.height = "400px";
    dialogConfig.data = {
      id: 3,
      title: "User Roles for: ",
      user: pUser
    };
    const dialogRef = this.removeUserDialog.open(EditRolesComponent, dialogConfig);
    dialogConfig.position = {
      top: '0',
      left: '0'
    };

    dialogRef.afterClosed().subscribe(result => {
    });

    dialogRef.componentInstance.onUpdateRole.subscribe(notificationValue => {
      this.showNotification('top', 'right', "Role: ", notificationValue["roleName"], notificationValue["msgStatus"], notificationValue["classType"]);
    });

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }

  //    ______    _ _ _     _    _                 __  __           _       _ 
  //   |  ____|  | (_) |   | |  | |               |  \/  |         | |     | |
  //   | |__   __| |_| |_  | |  | |___  ___ _ __  | \  / | ___   __| | __ _| |
  //   |  __| / _` | | __| | |  | / __|/ _ \ '__| | |\/| |/ _ \ / _` |/ _` | |
  //   | |___| (_| | | |_  | |__| \__ \  __/ |    | |  | | (_) | (_| | (_| | |
  //   |______\__,_|_|\__|  \____/|___/\___|_|    |_|  |_|\___/ \__,_|\__,_|_|
  //                                                                          
  //                                                                          

  openEditUserModal(pUser) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "395px";
    dialogConfig.height = "315px";
    dialogConfig.data = {
      id: 3,
      title: "Edit User: ",
      user: pUser
    };
    const dialogRef = this.removeUserDialog.open(EditUserComponent, dialogConfig);
    dialogConfig.position = {
      top: '0',
      left: '0'
    };

    dialogRef.afterClosed().subscribe(result => {
    });

    dialogRef.componentInstance.onUpdateUser.subscribe(notificationValue => {
      this.showNotification('top', 'right', "User: ", notificationValue["username"], notificationValue["msgStatus"], notificationValue["classType"]);
      dialogRef.close();
    });

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }

}
