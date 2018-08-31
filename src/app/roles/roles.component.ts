import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';


import { ToastrService } from 'ngx-toastr';
import { AddCategoryComponent } from '../modals/add-category/add-category.component';
import { EditCategoryComponent } from '../modals/edit-category/edit-category.component';
import { RemoveCategoryComponent } from '../modals/remove-category/remove-category.component';

@Component({
    selector: 'roles-list',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    providers: []
})
export class RolesComponent implements OnInit {
    permissionCategories: Array<any>;
    displayedColumns: string[];
    dataSource: any;

    constructor(private toastr: ToastrService, public addCategoryDialog: MatDialog, public editCategoryDialog: MatDialog, public removeCategoryDialog: MatDialog) { }

    ngOnInit() {
        this.displayedColumns = ['name', 'edit', 'remove'];
        this.setPermissionCategoriesInfo();
        this.setTableDataSource();
    }

    setPermissionCategoriesInfo() {
        this.permissionCategories = [
            {id: 1, name: "Krobots"},
            {id: 2, name: "Permissions"},
            {id: 3, name: "Finance"}
        ];
    }

    private setTableDataSource() {
        this.dataSource = new MatTableDataSource(this.permissionCategories);
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
  
    //                _     _    _____      _                                _____  _       _             
    //       /\      | |   | |  / ____|    | |                              |  __ \(_)     | |            
    //      /  \   __| | __| | | |     __ _| |_ ___  __ _  ___  _ __ _   _  | |  | |_  __ _| | ___   __ _ 
    //     / /\ \ / _` |/ _` | | |    / _` | __/ _ \/ _` |/ _ \| '__| | | | | |  | | |/ _` | |/ _ \ / _` |
    //    / ____ \ (_| | (_| | | |___| (_| | ||  __/ (_| | (_) | |  | |_| | | |__| | | (_| | | (_) | (_| |
    //   /_/    \_\__,_|\__,_|  \_____\__,_|\__\___|\__, |\___/|_|   \__, | |_____/|_|\__,_|_|\___/ \__, |
    //                                               __/ |            __/ |                          __/ |
    //                                              |___/            |___/                          |___/ 

    
    
    private addCategoryToArray(newCategory) {
        console.dir(newCategory);
        this.permissionCategories.push(newCategory);
        this.setTableDataSource();
    }
    
    openAddCategory() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "415px";
        dialogConfig.height = "280px";
        dialogConfig.data = {
            id: 1,
            title: "Add Category"
        };
        const dialogRef = this.addCategoryDialog.open(AddCategoryComponent, dialogConfig);
        dialogConfig.position = {
            top: '0',
            left: '0'
        };

        dialogRef.afterClosed().subscribe(result => {
        });

        dialogRef.backdropClick().subscribe(_ => {
            dialogRef.close();
        });

        dialogRef.componentInstance.onAddCategoryEvn.subscribe(notificationObj => {
            if(notificationObj["status"]) {
                this.addCategoryToArray(notificationObj["category"]);
                this.showNotification('top', 'right', "Category: ", notificationObj["category"]["name"], notificationObj["msgStatus"], notificationObj["classType"]);
                dialogRef.close();
            }
            else{

            }
        });
    }


    //    ______    _ _ _      _____      _                                _____  _       _             
    //   |  ____|  | (_) |    / ____|    | |                              |  __ \(_)     | |            
    //   | |__   __| |_| |_  | |     __ _| |_ ___  __ _  ___  _ __ _   _  | |  | |_  __ _| | ___   __ _ 
    //   |  __| / _` | | __| | |    / _` | __/ _ \/ _` |/ _ \| '__| | | | | |  | | |/ _` | |/ _ \ / _` |
    //   | |___| (_| | | |_  | |___| (_| | ||  __/ (_| | (_) | |  | |_| | | |__| | | (_| | | (_) | (_| |
    //   |______\__,_|_|\__|  \_____\__,_|\__\___|\__, |\___/|_|   \__, | |_____/|_|\__,_|_|\___/ \__, |
    //                                             __/ |            __/ |                          __/ |
    //                                            |___/            |___/                          |___/ 

    
    private editCategory(categoryUpdated) {
        for(var categoryCounter = 0; categoryCounter < this.permissionCategories.length; categoryCounter++){
            var currentCategory = this.permissionCategories[categoryCounter];
            if(currentCategory["id"] === categoryUpdated["id"]){
                currentCategory["name"] = categoryUpdated["name"];
                return;
            }
        }
    }
    
    openEditCategoryModal(category) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "415px";
        dialogConfig.height = "280px";
        dialogConfig.data = {
            id: 2,
            title: "Edit Category",
            category: category
        };
        const dialogRef = this.editCategoryDialog.open(EditCategoryComponent, dialogConfig);
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
                this.editCategory(notificationObj["category"]);
                this.showNotification('top', 'right', "Category: ", notificationObj["category"]["name"], notificationObj["msgStatus"], notificationObj["classType"]);
                dialogRef.close();
            }
            else{

            }
        });
    }


    //    _____                                  _____      _                                _____  _       _             
    //   |  __ \                                / ____|    | |                              |  __ \(_)     | |            
    //   | |__) |___ _ __ ___   _____   _____  | |     __ _| |_ ___  __ _  ___  _ __ _   _  | |  | |_  __ _| | ___   __ _ 
    //   |  _  // _ \ '_ ` _ \ / _ \ \ / / _ \ | |    / _` | __/ _ \/ _` |/ _ \| '__| | | | | |  | | |/ _` | |/ _ \ / _` |
    //   | | \ \  __/ | | | | | (_) \ V /  __/ | |___| (_| | ||  __/ (_| | (_) | |  | |_| | | |__| | | (_| | | (_) | (_| |
    //   |_|  \_\___|_| |_| |_|\___/ \_/ \___|  \_____\__,_|\__\___|\__, |\___/|_|   \__, | |_____/|_|\__,_|_|\___/ \__, |
    //                                                               __/ |            __/ |                          __/ |
    //                                                              |___/            |___/                          |___/ 


    private removeCategoryFromArray(id) {
        for(var categoryCounter = 0; categoryCounter < this.permissionCategories.length; categoryCounter++){
            if(this.permissionCategories[categoryCounter]["id"] === id){
                this.permissionCategories.splice(categoryCounter, 1);
                this.setTableDataSource();
                return;
            }
        }
    }

    openRemoveCategoryModal(category) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "415px";
        dialogConfig.height = "240px";
        dialogConfig.data = {
            id: 2,
            title: "Are you sure you want to remove category: ",
            category: category
        };
        const dialogRef = this.removeCategoryDialog.open(RemoveCategoryComponent, dialogConfig);
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
                this.removeCategoryFromArray(notificationObj["category"]["id"]);
                this.showNotification('top', 'right', "Category: ", notificationObj["category"]["name"], notificationObj["msgStatus"], notificationObj["classType"]);
                dialogRef.close();
            }
            else{

            }
        });
    }

}
