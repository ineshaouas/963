
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Cotisation } from '../model/Cotisation';
export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class CotisationsService {
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createcotisation (cotisation :Cotisation ):Observable<any>
{
return this.http.post(this.baseUrl+"/Cotisations" ,cotisation);


}
getcotisations(): Observable<Cotisation[]> {
  return this.http.get<Cotisation[]>(this.baseUrl+"/cotisations");
}
deleteCotisation(id: number): Observable<Cotisation>{
  return this.http.delete<Cotisation>(`${this.baseUrl}/Cotisations/${id}`);
}

findcotisationById(id: number): Observable<Cotisation>{
  return this.http.get<Cotisation>(`${this.baseUrl}/Cotisations/${id}`);
}
updtaecotisation (cotisation :Cotisation,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/Cotisations/${id}` ,cotisation);


}


}
