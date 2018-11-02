import { Routes } from '@angular/router';

import { AuthGuard } from './../../login/auth.guard';
import { UsersComponent } from '../../users/users.component';
import { PermissionsComponent } from '../../permissions/permissions.component';
import { PermissionCategoryComponent } from '../../permission_category/permission_category.component';
import { RolesComponent } from '../../roles/roles.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'users',                            component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'permissions',                      component: PermissionsComponent, canActivate: [AuthGuard] },
    { path: 'permissionCategories',             component: PermissionCategoryComponent, canActivate: [AuthGuard] },
    { path: 'roles',                            component: RolesComponent, canActivate: [AuthGuard] }
];
