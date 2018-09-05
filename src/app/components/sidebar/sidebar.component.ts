import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/users', title: 'Users',  icon: 'users_circle-08', class: '' },
    { path: '/permissions', title: 'Permissions',  icon: 'sport_user-run', class: '' },
    { path: '/roles', title: 'Roles',  icon: 'users_single-02', class: '' },
    { path: '/permissionCategories', title: 'Permission Categories',  icon: 'business_badge', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
