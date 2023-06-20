
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Planification } from '../model/Planification';

export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class PlanificationsService {
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createplanifications(planification :Planification ):Observable<any>
{
return this.http.post(this.baseUrl+"/Planification" ,planification);


}
getplanifications(): Observable<Planification[]> {
  return this.http.get<Planification[]>(this.baseUrl+"/ListePlanifications");
}
deleteplanification(id: number): Observable<Planification>{
  return this.http.delete<Planification>(`${this.baseUrl}/ListePlanifications/${id}`);
}

findplanificationById(id: number): Observable<Planification>{
  return this.http.get<Planification>(`${this.baseUrl}/ListePlanifications/${id}`);
}
updtaeplanification (planification :Planification,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/ListePlanifications/${id}` ,planification);


}


}
