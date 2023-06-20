import { Role } from './../model/Role.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createrole (role :Role ):Observable<any>
{
return this.http.post(this.baseUrl+"/Roles" ,role);


}
getroles(): Observable<Role[]> {
  return this.http.get<Role[]>(this.baseUrl+"/Roles");
}
deleterole(id: number): Observable<Role>{
  return this.http.delete<Role>(`${this.baseUrl}/Roles/${id}`);
}

findroleById(id: number): Observable<Role>{
  return this.http.get<Role>(`${this.baseUrl}/Roles/${id}`);
}
updtaerole (role :Role,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/Roles/${id}` ,role);


}


}
