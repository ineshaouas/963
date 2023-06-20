
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ListePlanification } from '../model/ListePlanification';
export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class ListePlanificationsService {
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createlisteplanifications (listeplanification :ListePlanification ):Observable<any>
{
return this.http.post(this.baseUrl+"/ListePlanifications" ,listeplanification);


}
getlisteplanifications(): Observable<ListePlanification[]> {
  return this.http.get<ListePlanification[]>(this.baseUrl+"/ListePlanifications");
}
deletelisteplanification(id: number): Observable<ListePlanification>{
  return this.http.delete<ListePlanification>(`${this.baseUrl}/ListePlanifications/${id}`);
}

findlisteplanificationById(id: number): Observable<ListePlanification>{
  return this.http.get<ListePlanification>(`${this.baseUrl}/ListePlanifications/${id}`);
}
updtaelisteplanification (listeplanification :ListePlanification,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/ListePlanifications/${id}` ,listeplanification);


}


}
