import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatComponent } from './pages/stat/stat.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes =[

  {path: '' ,component: HomeComponent},
  { path: "stat", component: StatComponent  },
  { path: "profile", component: ProfileComponent  },

  
  
  {path: "map", component: MapComponent},
 
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
