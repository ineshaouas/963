
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Shift } from '../model/Shift';
export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createshift (shift :Shift ):Observable<any>
{
return this.http.post(this.baseUrl+"/Shifts" ,shift);


}
getshifts(): Observable<Shift[]> {
  return this.http.get<Shift[]>(this.baseUrl+"/Shifts");
}
deleteshift(id: number): Observable<Shift>{
  return this.http.delete<Shift>(`${this.baseUrl}/Shifts/${id}`);
}

findshiftById(id: number): Observable<Shift>{
  return this.http.get<Shift>(`${this.baseUrl}/Shifts/${id}`);
}
updtaeshift (shift :Shift,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/Shifts/${id}` ,shift);


}


}
