import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionComponent } from './Permission/permission.component';
import { ListRoleComponent } from './Roles/list-role.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from 'src/app/home/home.component';
import { GuardUserGuard } from 'src/app/services/guard-user.guard';
import { ListUserComponent } from '../user/list-user/list-user.component';

const routes: Routes = [
  {
  path:'admin' ,component:AdminComponent  , canActivate:[GuardUserGuard]  ,
  children:[
  {path:'permissions' ,component:PermissionComponent},
  {path:'roles' ,component:ListRoleComponent},
  {path:'users', component:ListUserComponent},
  { path: "**" ,component:HomeComponent},
  ]
}
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
