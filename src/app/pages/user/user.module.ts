import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { PlanificationComponent } from './planifi/planification/planification.component';
import { ShiftListComponent } from './shift/shift-list/shift-list.component';
import { CotisationComponent } from './coti/cotisation/cotisation.component';
import { AdminComponent } from './admin/admin.component';

import { ListUserComponent } from './list-user/list-user.component';
import { SuperAdminModule } from '../super-admin/super-admin.module';
import { AgnceFilterPipe } from 'src/app/pipes/AgnceFilterPipe.pipe';
import { AgenceModule } from '../agence/agence.module';
import { FilterPipe } from 'src/app/pipes/FilterPipe.pipe';


@NgModule({
  declarations: [
    ShiftListComponent,
    CotisationComponent,
    AdminComponent,

    PlanificationComponent,
    ListUserComponent, FilterPipe,
  ],
  imports: [
    CommonModule,SuperAdminModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    ShiftListComponent
  ]
})
export class UserModule { }
