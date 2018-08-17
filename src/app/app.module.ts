import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule} from '@angular/material';


// Modals
import { AddUserComponent } from '../app/modals/add-user/add-user.component';
import { RemoveUserComponent } from '../app/modals/remove-user/remove-user.component';
import { EditPermissionsComponent } from '../app/modals/edit-permissions/edit-permissions.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule,
    NgbModule.forRoot()
  ],
  schemas: [ 
    NO_ERRORS_SCHEMA 
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddUserComponent, RemoveUserComponent, EditPermissionsComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserComponent, RemoveUserComponent, EditPermissionsComponent
  ]
})
export class AppModule { }
