import { NgChartsModule } from 'ng2-charts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AgenceModule } from './pages/agence/agence.module';
import { SuperAdminModule } from './pages/super-admin/super-admin.module';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { GuardUserGuard } from './services/guard-user.guard';
import { HttpInterceptors } from './services/http-interceptors.service';
import { StatComponent } from './pages/stat/stat.component';

import { MapComponent } from './map/map.component';

import { Cotisation } from './model/Cotisation';
import { UserModule } from './pages/user/user.module';
import { ProfileComponent } from './profile/profile.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ProfileComponent,
  StatComponent,

  MapComponent,
 



    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    AgenceModule,
    SuperAdminModule,
    HttpClientModule,   
    FormsModule,   
    ReactiveFormsModule,   
    ToastrModule.forRoot(), 
    NgChartsModule,
    UserModule,
    SuperAdminModule,
    ReactiveFormsModule
  
  ],
  providers: [GuardUserGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptors, multi: true }],
  bootstrap: [AppComponent],
  exports: [
    HomeComponent 
  ]
})
export class AppModule { }
