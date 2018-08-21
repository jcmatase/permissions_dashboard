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
import { EditPermissionsComponent } from '../app/modals/edit-permissions/edit-permissions.component';
import { EditRolesComponent } from '../app/modals/edit-roles/edit-roles.component';
import { EditUserComponent } from '../app/modals/edit-user/edit-user.component';

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
    AddUserComponent, RemoveUserComponent, EditPermissionsComponent, EditRolesComponent, EditUserComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserComponent, RemoveUserComponent, EditPermissionsComponent, EditRolesComponent, EditUserComponent
  ]
})
export class AppModule { }
