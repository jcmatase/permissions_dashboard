import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule} from '@angular/material';


// Modals
import { AddUserComponent } from '../app/modals/add-user/add-user.component';
import { EditUserComponent } from '../app/modals/edit-user/edit-user.component';
import { RemoveUserComponent } from '../app/modals/remove-user/remove-user.component';
import { EditUserPermissionsComponent } from '../app/modals/edit-user-permissions/dashboard';
import { EditUserRolesComponent } from '../app/modals/edit-user-roles/edit-roles.component';
import { AddCategoryComponent } from '../app/modals/add-category/add-category.component';
import { EditCategoryComponent } from '../app/modals/edit-category/edit-category.component';
import { RemoveCategoryComponent } from '../app/modals/remove-category/remove-category.component';
import { AddPermissionComponent } from '../app/modals/add-permission/add-permission.component';
import { EditPermissionComponent } from '../app/modals/edit-permission/edit-permission.component';
import { RemovePermissionComponent } from '../app/modals/remove-permission/remove-permission.component';
import { AddRoleComponent } from '../app/modals/add-role/add-role.component';
import { EditRoleComponent } from '../app/modals/edit-role/edit-role.component';
import { RemoveRoleComponent } from '../app/modals/remove-role/remove-role.component';

// Services
import { AuthService } from '../app/services/auth.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule,
    NgbModule.forRoot()
  ],
  schemas: [ 
    NO_ERRORS_SCHEMA 
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddUserComponent, EditUserComponent, EditUserRolesComponent, EditUserPermissionsComponent, RemoveUserComponent ,
    AddCategoryComponent, EditCategoryComponent, RemoveCategoryComponent,
    AddPermissionComponent, EditPermissionComponent, RemovePermissionComponent,
    AddRoleComponent, EditRoleComponent, RemoveRoleComponent, LoginComponent
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserComponent, EditUserComponent, EditUserRolesComponent, EditUserPermissionsComponent, RemoveUserComponent,
    AddCategoryComponent, EditCategoryComponent, RemoveCategoryComponent,
    AddPermissionComponent, EditPermissionComponent, RemovePermissionComponent,
    AddRoleComponent, EditRoleComponent, RemoveRoleComponent
  ]
})
export class AppModule { }
