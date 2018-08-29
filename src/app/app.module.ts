import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule} from '@angular/material';


// Modals
import { AddUserComponent } from '../app/modals/add-user/add-user.component';
import { RemoveUserComponent } from '../app/modals/remove-user/remove-user.component';
import { EditUserPermissionsComponent } from '../app/modals/edit-user-permissions/dashboard';
import { EditRolesComponent } from '../app/modals/edit-roles/edit-roles.component';
import { EditUserComponent } from '../app/modals/edit-user/edit-user.component';
import { AddCategoryComponent } from '../app/modals/add-category/add-category.component';
import { EditCategoryComponent } from '../app/modals/edit-category/edit-category.component';
import { RemoveCategoryComponent } from '../app/modals/remove-category/remove-category.component';

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
    AddUserComponent, RemoveUserComponent, EditUserPermissionsComponent, EditRolesComponent, EditUserComponent,
    AddCategoryComponent, EditCategoryComponent, RemoveCategoryComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserComponent, RemoveUserComponent, EditUserPermissionsComponent, EditRolesComponent, EditUserComponent,
    AddCategoryComponent, EditCategoryComponent, RemoveCategoryComponent
  ]
})
export class AppModule { }
