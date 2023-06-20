
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PlanificationParAgence } from '../model/PlanificationParAgence';
export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class PlanificationParAgencesService {
  createplanificationparagences(permission: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createPlanificationParAgences (PlanificationParAgence :PlanificationParAgence ):Observable<any>
{
return this.http.post(this.baseUrl+"/PlanificationParAgences" ,PlanificationParAgence);


}
getPlanificationParAgences(): Observable<PlanificationParAgence[]> {
  return this.http.get<PlanificationParAgence[]>(this.baseUrl+"/PlanificationParAgences");
}
deletePlanificationParAgence(id: number): Observable<PlanificationParAgence>{
  return this.http.delete<PlanificationParAgence>(`${this.baseUrl}/PlanificationParAgences/${id}`);
}

findPlanificationParAgenceById(id: number): Observable<PlanificationParAgence>{
  return this.http.get<PlanificationParAgence>(`${this.baseUrl}/PlanificationParAgences/${id}`);
}
updtaePlanificationParAgence (PlanificationParAgence :PlanificationParAgence,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/PlanificationParAgences/${id}` ,PlanificationParAgence);


}


}
