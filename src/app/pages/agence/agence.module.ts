import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenceRoutingModule } from './agence-routing.module';
import { ListVehiculeComponent } from './list-vehicule/list-vehicule.component';
import { ListPlanifiagenComponent } from './list-planifiagen/list-planifiagen.component';
import { ListCircuitComponent } from './list-circuit/list-circuit.component';
import { ListFacturationComponent } from './list-facturation/list-facturation.component';
import { ListAgenceComponent } from './list-agence/list-agence.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgancescComponent } from './agancesc/agancesc.component';
import { StationComponent } from './station/station.component';
import { AgnceFilterPipe } from 'src/app/pipes/AgnceFilterPipe.pipe';

import { SuperAdminModule } from '../super-admin/super-admin.module';







@NgModule({
  declarations: [
    ListVehiculeComponent,
    ListPlanifiagenComponent,
    ListCircuitComponent,
    ListFacturationComponent,
    ListAgenceComponent,
    StationComponent,
   
    AgancescComponent,   AgnceFilterPipe,
   
  ],
  imports: [
    
    CommonModule,FormsModule, SuperAdminModule,
    AgenceRoutingModule ,ReactiveFormsModule
  ]
})
export class AgenceModule { }
