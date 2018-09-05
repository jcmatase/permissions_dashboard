import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UsersComponent } from '../../users/users.component';
import { PermissionsComponent } from '../../permissions/permissions.component';
import { PermissionCategoryComponent } from '../../permission_category/permission_category.component';
import { RolesComponent } from '../../roles/roles.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatCheckboxModule, MatSelectModule,
    MatIconModule,
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    UsersComponent,
    PermissionsComponent,
    PermissionCategoryComponent,
    RolesComponent
  ]
})

export class AdminLayoutModule {}
