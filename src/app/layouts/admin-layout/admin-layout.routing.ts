import { Routes } from '@angular/router';

import { UsersComponent } from '../../users/users.component';
import { PermissionsComponent } from '../../permissions/permissions.component';
import { PermissionCategoryComponent } from '../../permission_category/permission_category.component';
import { RolesComponent } from '../../roles/roles.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'users',                            component: UsersComponent },
    { path: 'permissions',                      component: PermissionsComponent },
    { path: 'permissionCategories',             component: PermissionCategoryComponent },
    { path: 'roles',                            component: RolesComponent }
];
