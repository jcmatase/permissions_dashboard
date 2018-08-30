import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';


import { ToastrService } from 'ngx-toastr';
import { RemovePermissionComponent } from '../modals/remove-permission/remove-permission.component';
import { AddPermissionComponent } from '../modals/add-permission/add-permission.component';
import { EditPermissionComponent } from '../modals/edit-permission/edit-permission.component';

@Component({
    selector: 'permissions-list',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss'],
    providers: []
})
export class PermissionsComponent implements OnInit {
    permissions: Array<any>;
    displayedColumns: string[];
    dataSource: any;

    constructor(private toastr: ToastrService, public addPermissionDialog: MatDialog, public editPermissionDialog: MatDialog, public removePermissionDialog: MatDialog) { }

    ngOnInit() {
        this.displayedColumns = ['permissionName', 'categoryName', 'edit', 'remove'];
        this.setPermissionsInfo();
        this.setTableDataSource();
    }

    setPermissionsInfo() {
        //TO-DO: when querying db select -permission id- as -permissionID-, -permission name- as -permissionName-, 
        // -category id- as -categoryID- and -category name- as -categoryName-
        this.permissions = [
            {permissionID: 1, permissionName: "view_gateway", categoryID: 1, categoryName: "Krobots"},
            {permissionID: 2, permissionName: "edit_gateway", categoryID: 1, categoryName: "Krobots"},
            {permissionID: 5, permissionName: "view_finance", categoryID: 2, categoryName: "Finance"},
            {permissionID: 6, permissionName: "edit_finance", categoryID: 3, categoryName: "Finance"},
            {permissionID: 3, permissionName: "view_permissions", categoryID: 3, categoryName: "Permissions"},
            {permissionID: 4, permissionName: "edit_permissions", categoryID: 3, categoryName: "Permissions"}
        ];
    }

    private setTableDataSource() {
        this.dataSource = new MatTableDataSource(this.permissions);
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

    //                _     _   _____                    _         _               __  __           _       _ 
    //       /\      | |   | | |  __ \                  (_)       (_)             |  \/  |         | |     | |
    //      /  \   __| | __| | | |__) |__ _ __ _ __ ___  _ ___ ___ _  ___  _ __   | \  / | ___   __| | __ _| |
    //     / /\ \ / _` |/ _` | |  ___/ _ \ '__| '_ ` _ \| / __/ __| |/ _ \| '_ \  | |\/| |/ _ \ / _` |/ _` | |
    //    / ____ \ (_| | (_| | | |  |  __/ |  | | | | | | \__ \__ \ | (_) | | | | | |  | | (_) | (_| | (_| | |
    //   /_/    \_\__,_|\__,_| |_|   \___|_|  |_| |_| |_|_|___/___/_|\___/|_| |_| |_|  |_|\___/ \__,_|\__,_|_|
    //                                                                                                        
    //                                                                                                        

    private addPermissionToArray(newPermission) {
        console.dir(newPermission);
        this.permissions.push(newPermission);
        this.setTableDataSource();
    }

    private setPermissionCategoriesInfo(){
        // Query all values in Permission_Category table
        return [
            {id: 1, name: "Krobots"},
            {id: 2, name: "Finance"},
            {id: 3, name: "Permission"},
            {id: 4, name: "Other Category"},
        ];
    }
    
    openAddPermissionModal() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "415px";
        dialogConfig.height = "320px";
        dialogConfig.data = {
            id: 1,
            title: "Add Permission",
            availablePermissionCategories: this.setPermissionCategoriesInfo()
        };
        const dialogRef = this.addPermissionDialog.open(AddPermissionComponent, dialogConfig);
        dialogConfig.position = {
            top: '0',
            left: '0'
        };

        dialogRef.afterClosed().subscribe(result => {
        });

        dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
        });

        dialogRef.componentInstance.onAddPermissionEvn.subscribe(notificationObj => {
            if(notificationObj["status"]) {
                this.addPermissionToArray(notificationObj["permission"]);
                this.showNotification('top', 'right', "Permission: ", notificationObj["permission"]["permissionName"], notificationObj["msgStatus"], notificationObj["classType"]);
                dialogRef.close();
            }
            else{

            }
        });
    }


    //    _____                                 _____                    _         _               __  __           _       _ 
    //   |  __ \                               |  __ \                  (_)       (_)             |  \/  |         | |     | |
    //   | |__) |___ _ __ ___   _____   _____  | |__) |__ _ __ _ __ ___  _ ___ ___ _  ___  _ __   | \  / | ___   __| | __ _| |
    //   |  _  // _ \ '_ ` _ \ / _ \ \ / / _ \ |  ___/ _ \ '__| '_ ` _ \| / __/ __| |/ _ \| '_ \  | |\/| |/ _ \ / _` |/ _` | |
    //   | | \ \  __/ | | | | | (_) \ V /  __/ | |  |  __/ |  | | | | | | \__ \__ \ | (_) | | | | | |  | | (_) | (_| | (_| | |
    //   |_|  \_\___|_| |_| |_|\___/ \_/ \___| |_|   \___|_|  |_| |_| |_|_|___/___/_|\___/|_| |_| |_|  |_|\___/ \__,_|\__,_|_|
    //                                                                                                                        
    //                                                                                                                        

    private removePermissionFromArray(permissionID) {
        for(var permissionCounter = 0; permissionCounter < this.permissions.length; permissionCounter++){
            if(this.permissions[permissionCounter]["permissionID"] === permissionID){
                this.permissions.splice(permissionCounter, 1);
                this.setTableDataSource();
                return;
            }
        }
    }

    openRemovePermissionModal(permission) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "415px";
        dialogConfig.height = "240px";
        dialogConfig.data = {
            id: 2,
            title: "Are you sure you want to remove permission: ",
            permission: permission
        };
        const dialogRef = this.removePermissionDialog.open(RemovePermissionComponent, dialogConfig);
        dialogConfig.position = {
            top: '0',
            left: '0'
        };

        dialogRef.afterClosed().subscribe(result => {
        });

        dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
        });

        dialogRef.componentInstance.onRemovePermissionEvn.subscribe(notificationObj => {
            if(notificationObj["status"]) {
                this.removePermissionFromArray(notificationObj["permission"]["permissionID"]);
                this.showNotification('top', 'right', "Permission: ", notificationObj["permission"]["permissionName"], notificationObj["msgStatus"], notificationObj["classType"]);
                dialogRef.close();
            }
            else{

            }
        });
    }


    //    ______    _ _ _     _____                    _         _               __  __           _       _ 
    //   |  ____|  | (_) |   |  __ \                  (_)       (_)             |  \/  |         | |     | |
    //   | |__   __| |_| |_  | |__) |__ _ __ _ __ ___  _ ___ ___ _  ___  _ __   | \  / | ___   __| | __ _| |
    //   |  __| / _` | | __| |  ___/ _ \ '__| '_ ` _ \| / __/ __| |/ _ \| '_ \  | |\/| |/ _ \ / _` |/ _` | |
    //   | |___| (_| | | |_  | |  |  __/ |  | | | | | | \__ \__ \ | (_) | | | | | |  | | (_) | (_| | (_| | |
    //   |______\__,_|_|\__| |_|   \___|_|  |_| |_| |_|_|___/___/_|\___/|_| |_| |_|  |_|\___/ \__,_|\__,_|_|
    //                                                                                                      
    //                                                                                                      


    /*
        Parameters:
            oldPermissionObj = {categoryID: 3, categoryName: "Finance", permissionID: 6, permissionName: "edit_finance"}
            newPermissionName = "New Name"
            categoryObj = {id: 2, name: "Finance"}
    */
    private editPermissionFromArray(oldPermissionObj, newPermissionName, categoryObj) {
        for(var permissionCounter = 0; permissionCounter < this.permissions.length; permissionCounter++){
            var permissionInArray = this.permissions[permissionCounter];
            if(permissionInArray["permissionID"] === oldPermissionObj["permissionID"]){
                if(newPermissionName !== '') {
                    permissionInArray["permissionName"] = newPermissionName;
                }
                if(categoryObj !== '' && categoryObj !== {}) {
                    permissionInArray["categoryID"] = categoryObj["id"];
                    permissionInArray["categoryName"] = categoryObj["name"];
                }
                this.setTableDataSource();
                return;
            }
        }
    }

    openEditPermissionModal(permission) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "415px";
        dialogConfig.height = "320px";
        dialogConfig.data = {
            id: 2,
            title: "Edit Permission",
            currentPermission: permission,
            availablePermissionCategories: this.setPermissionCategoriesInfo()
        };
        const dialogRef = this.removePermissionDialog.open(EditPermissionComponent, dialogConfig);
        dialogConfig.position = {
            top: '0',
            left: '0'
        };

        dialogRef.afterClosed().subscribe(result => {
        });

        dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
        });

        dialogRef.componentInstance.onEditPermissionEvn.subscribe(notificationObj => {
            if(notificationObj["status"] === 100) {
                this.showNotification('top', 'right', "Permission: ", notificationObj["permission"]["permissionName"], notificationObj["msgStatus"], notificationObj["classType"]);
            }
            if(notificationObj["status"] === 0) {

            }
            if(notificationObj["status"] === 1) {
                this.editPermissionFromArray(notificationObj["permission"], notificationObj["newPermissionName"], notificationObj["newPermissionCategory"]);
                this.showNotification('top', 'right', "Permission: ", notificationObj["permission"]["permissionName"], notificationObj["msgStatus"], notificationObj["classType"]);
                dialogRef.close();
            }
        });
    }

}
