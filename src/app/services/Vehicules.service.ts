
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Vehicule } from '../model/Vehicule';
export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class VehiculesService {
  updtae(vehicule: Vehicule, id: number) {
    throw new Error('Method not implemented.');
  }
  deleterole(id: number) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createvehicule (vehicule :Vehicule ):Observable<any>
{
return this.http.post(this.baseUrl+"/Vehicules" ,vehicule);


}
getvehicule(): Observable<Vehicule[]> {
  return this.http.get<Vehicule[]>(this.baseUrl+"/Vehicules");
}

addstation(id: number,idstat: number): Observable<Vehicule[]> {
  return this.http.get<Vehicule[]>(this.baseUrl+"/addstation/"+id+"/"+idstat);
}
deletevehicule(id: number): Observable<Vehicule>{
  return this.http.delete<Vehicule>(`${this.baseUrl}/Vehicules/${id}`);
}

findvehicleById(id: number): Observable<Vehicule>{
  return this.http.get<Vehicule>(`${this.baseUrl}/Vehicules/${id}`);
}
updtaevehicule (vehicule :Vehicule,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/Vehicules/${id}` ,vehicule);


}


}
