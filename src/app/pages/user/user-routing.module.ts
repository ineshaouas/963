import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanificationComponent } from './planifi/planification/planification.component';
import { ShiftListComponent } from './shift/shift-list/shift-list.component';
import { CotisationComponent } from './coti/cotisation/cotisation.component';
import { AdminComponent } from './admin/admin.component';
import { ListUserComponent } from './list-user/list-user.component';
import { StationComponent } from '../agence/station/station.component';
import { ListCircuitComponent } from '../agence/list-circuit/list-circuit.component';
import { PlanificationParAgence } from 'src/app/model/PlanificationParAgence';

const routes: Routes = [
  {
    path:'userkey' ,component:AdminComponent, 
    children:[
      {path:'users', component:ListUserComponent},
      {path: 'planification' ,component:PlanificationComponent},
      {path: 'shift' , component:ShiftListComponent},
      {path: 'cotisation' ,component:CotisationComponent},
      {path:'circuit' , component:ListCircuitComponent},
      {path:'stations' , component:StationComponent},
    ] },{path:'Servicepaie/cotisation' , component:CotisationComponent},
    {path: 'Psmanger/planification' ,component:PlanificationComponent},


 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
