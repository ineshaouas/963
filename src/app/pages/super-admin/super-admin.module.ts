import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { PermissionComponent } from './Permission/permission.component';
import { ListRoleComponent } from './Roles/list-role.component';
import { AdminComponent } from './admin/admin.component';
import { AdminfooterComponent } from '../layout/adminfooter/adminfooter.component';
import { FormsModule } from '@angular/forms';
import { AdminheaderComponent } from '../layout/adminheader/adminheader.component';
import { AdminsidebarComponent } from '../layout/adminsidebar/adminsidebar.component';


@NgModule({
  declarations: [
    PermissionComponent,
    ListRoleComponent,
    AdminComponent,
    AdminheaderComponent,
    AdminsidebarComponent,
    AdminfooterComponent,
   
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,      FormsModule
  ],
  exports: [
    AdminheaderComponent,
    AdminsidebarComponent,
    AdminfooterComponent,
  ]
})
export class SuperAdminModule { }
