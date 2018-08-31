import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';


import { ToastrService } from 'ngx-toastr';
import { AddRoleComponent } from '../modals/add-role/add-role.component';
import { EditCategoryComponent } from '../modals/edit-category/edit-category.component';
import { RemoveCategoryComponent } from '../modals/remove-category/remove-category.component';

@Component({
    selector: 'roles-list',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    providers: []
})
export class RolesComponent implements OnInit {
    roles: Array<any>;
    displayedColumns: string[];
    dataSource: any;

    constructor(private toastr: ToastrService, public addRoleDialog: MatDialog, public editRoleDialog: MatDialog, public removeRoleDialog: MatDialog) { }

    ngOnInit() {
        this.displayedColumns = ['name', 'edit', 'remove'];
        this.setRolesInfo();
        this.setTableDataSource();
    }

    setRolesInfo() {
        this.roles = [
            {id: 1, name: "Admin"},
            {id: 2, name: "Finance"},
            {id: 3, name: "Media"}
        ];
    }

    private setTableDataSource() {
        this.dataSource = new MatTableDataSource(this.roles);
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


    //                _     _   _____       _        __  __           _       _ 
    //       /\      | |   | | |  __ \     | |      |  \/  |         | |     | |
    //      /  \   __| | __| | | |__) |___ | | ___  | \  / | ___   __| | __ _| |
    //     / /\ \ / _` |/ _` | |  _  // _ \| |/ _ \ | |\/| |/ _ \ / _` |/ _` | |
    //    / ____ \ (_| | (_| | | | \ \ (_) | |  __/ | |  | | (_) | (_| | (_| | |
    //   /_/    \_\__,_|\__,_| |_|  \_\___/|_|\___| |_|  |_|\___/ \__,_|\__,_|_|
    //                                                                          
    //                                                                          

    
    
    private addRoleToArray(newRole) {
        console.dir(newRole);
        this.roles.push(newRole);
        this.setTableDataSource();
    }
    
    openAddRole() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "415px";
        dialogConfig.height = "280px";
        dialogConfig.data = {
            id: 1,
            title: "Add Role"
        };
        const dialogRef = this.addRoleDialog.open(AddRoleComponent, dialogConfig);
        dialogConfig.position = {
            top: '0',
            left: '0'
        };

        dialogRef.afterClosed().subscribe(result => {
        });

        dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
        });

        dialogRef.componentInstance.onAddRoleEvn.subscribe(notificationObj => {
            if(notificationObj["status"]) {
                this.addRoleToArray(notificationObj["role"]);
                this.showNotification('top', 'right', "Role: ", notificationObj["role"]["name"], notificationObj["msgStatus"], notificationObj["classType"]);
                dialogRef.close();
            }
            else{

            }
        });
    }


    //    ______    _ _ _     _____       _        __  __           _       _ 
    //   |  ____|  | (_) |   |  __ \     | |      |  \/  |         | |     | |
    //   | |__   __| |_| |_  | |__) |___ | | ___  | \  / | ___   __| | __ _| |
    //   |  __| / _` | | __| |  _  // _ \| |/ _ \ | |\/| |/ _ \ / _` |/ _` | |
    //   | |___| (_| | | |_  | | \ \ (_) | |  __/ | |  | | (_) | (_| | (_| | |
    //   |______\__,_|_|\__| |_|  \_\___/|_|\___| |_|  |_|\___/ \__,_|\__,_|_|
    //                                                                        
    //                                                                        



    private editRole(roleUpdated) {
        for(var roleCounter = 0; roleCounter < this.roles.length; roleCounter++){
            var currentRole = this.roles[roleCounter];
            if(currentRole["id"] === roleUpdated["id"]){
                currentRole["name"] = roleUpdated["name"];
                return;
            }
        }
    }
    
    openEditRoleModal(role) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "415px";
        dialogConfig.height = "280px";
        dialogConfig.data = {
            id: 2,
            title: "Edit Role",
            role: role
        };
        const dialogRef = this.editRoleDialog.open(EditCategoryComponent, dialogConfig);
        dialogConfig.position = {
            top: '0',
            left: '0'
        };

        dialogRef.afterClosed().subscribe(result => {
        });

        dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
        });

        dialogRef.componentInstance.onEditCategoryEvn.subscribe(notificationObj => {
            if(notificationObj["status"]) {
                this.editRole(notificationObj["role"]);
                this.showNotification('top', 'right', "Role: ", notificationObj["role"]["name"], notificationObj["msgStatus"], notificationObj["classType"]);
                dialogRef.close();
            }
            else{

            }
        });
    }

    //    _____                                 _____       _        __  __           _       _ 
    //   |  __ \                               |  __ \     | |      |  \/  |         | |     | |
    //   | |__) |___ _ __ ___   _____   _____  | |__) |___ | | ___  | \  / | ___   __| | __ _| |
    //   |  _  // _ \ '_ ` _ \ / _ \ \ / / _ \ |  _  // _ \| |/ _ \ | |\/| |/ _ \ / _` |/ _` | |
    //   | | \ \  __/ | | | | | (_) \ V /  __/ | | \ \ (_) | |  __/ | |  | | (_) | (_| | (_| | |
    //   |_|  \_\___|_| |_| |_|\___/ \_/ \___| |_|  \_\___/|_|\___| |_|  |_|\___/ \__,_|\__,_|_|
    //                                                                                          
    //                                                                                          


    private removeRoleFromArray(id) {
        for(var roleCounter = 0; roleCounter < this.roles.length; roleCounter++){
            if(this.roles[roleCounter]["id"] === id){
                this.roles.splice(roleCounter, 1);
                this.setTableDataSource();
                return;
            }
        }
    }

    openRemoveRoleModal(role) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "415px";
        dialogConfig.height = "240px";
        dialogConfig.data = {
            id: 2,
            title: "Are you sure you want to remove role: ",
            role: role
        };
        const dialogRef = this.removeRoleDialog.open(RemoveCategoryComponent, dialogConfig);
        dialogConfig.position = {
            top: '0',
            left: '0'
        };

        dialogRef.afterClosed().subscribe(result => {
        });

        dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
        });

        dialogRef.componentInstance.onRemoveCategoryEvn.subscribe(notificationObj => {
            if(notificationObj["status"]) {
                this.removeRoleFromArray(notificationObj["role"]["id"]);
                this.showNotification('top', 'right', "Role: ", notificationObj["role"]["name"], notificationObj["msgStatus"], notificationObj["classType"]);
                dialogRef.close();
            }
            else{

            }
        });
    }

}
