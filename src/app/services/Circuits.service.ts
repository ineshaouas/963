import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Circuit } from "../model/Circuit";

export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class CircuitsService {
  private baseUrl = "https://localhost:7102/api";
  findCircuit: any;


  constructor(private http: HttpClient) {}
  
createCircuit (Circuit :Circuit ):Observable<any>
{
return this.http.post(this.baseUrl+"/Circuits" ,Circuit);


}
getCircuits(): Observable<Circuit[]> {
  return this.http.get<Circuit[]>(this.baseUrl+"/Circuits");
}
deleteCircuit(id: number): Observable<Circuit>{
  return this.http.delete<Circuit>(`${this.baseUrl}/Circuits/${id}`);
}

findCircuitById(id: number): Observable<Circuit>{
  return this.http.get<Circuit>(`${this.baseUrl}/Circuits/${id}`);
}
updtaeCircuit (Circuit :Circuit,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/Circuits/${id}` ,Circuit);


}


}