import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';


import { ToastrService } from 'ngx-toastr';
import { AddCategoryComponent } from '../modals/add-category/add-category.component';

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

    constructor(private toastr: ToastrService, public addCategoryDialog: MatDialog, public editCategoryDialog: MatDialog, public removeCategoryDialog: MatDialog) { }

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

  private addCategoryToArray(newCategory) {
      console.dir(newCategory);
      this.permissionCategories.push(newCategory);
      this.dataSource = new MatTableDataSource(this.permissionCategories);
  }

  
    //                _     _    _____      _                                _____  _       _             
    //       /\      | |   | |  / ____|    | |                              |  __ \(_)     | |            
    //      /  \   __| | __| | | |     __ _| |_ ___  __ _  ___  _ __ _   _  | |  | |_  __ _| | ___   __ _ 
    //     / /\ \ / _` |/ _` | | |    / _` | __/ _ \/ _` |/ _ \| '__| | | | | |  | | |/ _` | |/ _ \ / _` |
    //    / ____ \ (_| | (_| | | |___| (_| | ||  __/ (_| | (_) | |  | |_| | | |__| | | (_| | | (_) | (_| |
    //   /_/    \_\__,_|\__,_|  \_____\__,_|\__\___|\__, |\___/|_|   \__, | |_____/|_|\__,_|_|\___/ \__, |
    //                                               __/ |            __/ |                          __/ |
    //                                              |___/            |___/                          |___/ 

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

}
