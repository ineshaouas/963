
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Permission } from '../model/Permission';
export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createpermissions (permission :Permission ):Observable<any>
{
return this.http.post(this.baseUrl+"/Permissions" ,permission);


}
getpermissions(): Observable<Permission[]> {
  return this.http.get<Permission[]>(this.baseUrl+"/Permissions");
}
deletepermission(id: number): Observable<Permission>{
  return this.http.delete<Permission>(`${this.baseUrl}/Permissions/${id}`);
}

findpermissionById(id: any): Observable<Permission>{
  return this.http.get<Permission>(`${this.baseUrl}/Permissions/${id}`);
}
updtaepermission (permission :Permission,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/Permissions/${id}` ,permission);


}


}
