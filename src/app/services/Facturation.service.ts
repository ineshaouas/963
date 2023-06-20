import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facturation } from '../model/Facturation';

export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class FacturationService {
  deletefacturation(id: number) {
    throw new Error('Method not implemented.');
  }

  createfacuration(facturation: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createFacturation (Facturation :Facturation):Observable<any>
{
return this.http.post(this.baseUrl+"/Facturations" ,Facturation);


}
getFacturation(): Observable<Facturation[]> {
  return this.http.get<Facturation[]>(this.baseUrl+"/Facturations");
}
deleteFacturation(id: number): Observable<Facturation>{
  return this.http.delete<Facturation>(`${this.baseUrl}/Facturations/${id}`);
}

findFacturationById(id: number): Observable<Facturation>{
  return this.http.get<Facturation>(`${this.baseUrl}/Facturations/${id}`);
}
updtaeFacturation (Facturation :Facturation,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/Facturations/${id}` ,Facturation);


}


}