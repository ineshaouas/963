import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Agence } from "../model/Agence";

export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class AgencesService {
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createAgence (Agence :Agence ):Observable<any>
{
return this.http.post(this.baseUrl+"/Agences" ,Agence);


}
getAgences(): Observable<Agence[]> {
  return this.http.get<Agence[]>(this.baseUrl+"/Agences");
}
deleteAgence(id: number): Observable<Agence>{
  return this.http.delete<Agence>(`${this.baseUrl}/Agences/${id}`);
}

findAgenceById(id: number): Observable<Agence>{
  return this.http.get<Agence>(`${this.baseUrl}/Agences/${id}`);
}
updtaeAgence (Agence :Agence,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/Agences/${id}` ,Agence);


}


}