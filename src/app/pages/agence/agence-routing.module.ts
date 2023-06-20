import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAgenceComponent } from './list-agence/list-agence.component';
import { ListCircuitComponent } from './list-circuit/list-circuit.component';
import { ListFacturationComponent } from './list-facturation/list-facturation.component';
import { ListPlanifiagenComponent } from './list-planifiagen/list-planifiagen.component';
import { ListVehiculeComponent } from './list-vehicule/list-vehicule.component';
import { AgancescComponent } from './agancesc/agancesc.component';
import { StationComponent } from './station/station.component';
import { HomeComponent } from 'src/app/home/home.component';
import { GuardUserGuard } from 'src/app/services/guard-user.guard';
import { ShiftListComponent } from '../user/shift/shift-list/shift-list.component';
import { PlanificationComponent } from '../user/planifi/planification/planification.component';
import { CotisationComponent } from '../user/coti/cotisation/cotisation.component';
import { PlanificationParAgence } from 'src/app/model/PlanificationParAgence';

const routes: Routes = [
 { path: 'restrans',component:AgancescComponent , canActivate:[GuardUserGuard]  ,
 children :[
  {path:'agance' , component:ListAgenceComponent},
    {path:'circuit' , component:ListCircuitComponent},
    {path:'stations' , component:StationComponent},
    {path:'facturation',component:ListFacturationComponent},
    {path:'planifiagence',component:ListPlanifiagenComponent},
    {path:'vehicule' ,component:ListVehiculeComponent},
    {path: 'shift' , component:ShiftListComponent},
    {path: 'planification' ,component:PlanificationComponent},
    {path: 'cotisation' ,component:CotisationComponent}
 ]
 },  {path:'Psmanger/planifiagenceag',component:ListPlanifiagenComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenceRoutingModule { }
