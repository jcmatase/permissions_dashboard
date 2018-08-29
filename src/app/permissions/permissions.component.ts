import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';


import { ToastrService } from 'ngx-toastr';
import { RemovePermissionComponent } from '../modals/remove-permission/remove-permission.component';

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

    constructor(private toastr: ToastrService, public addCategoryDialog: MatDialog, public editCategoryDialog: MatDialog, public removeCategoryDialog: MatDialog) { }

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
            {permissionID: 2, permissionName: "edit_gateway", categoryID: 2, categoryName: "Krobots"},
            {permissionID: 3, permissionName: "view_permissions", categoryID: 3, categoryName: "Permissions"},
            {permissionID: 4, permissionName: "edit_permissions", categoryID: 4, categoryName: "Permissions"},
            {permissionID: 5, permissionName: "view_finance", categoryID: 5, categoryName: "Finance"},
            {permissionID: 6, permissionName: "edit_finance", categoryID: 6, categoryName: "Finance"}
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

    openEditPermissionModal(permission) {
        console.dir(permission);
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
        for(var categoryCounter = 0; categoryCounter < this.permissions.length; categoryCounter++){
            if(this.permissions[categoryCounter]["permissionID"] === permissionID){
                this.permissions.splice(categoryCounter, 1);
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
        const dialogRef = this.removeCategoryDialog.open(RemovePermissionComponent, dialogConfig);
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

}
