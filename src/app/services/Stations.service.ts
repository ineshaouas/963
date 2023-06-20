
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Station } from '../model/Station';
export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class StationsService {
  filter(arg0: (e: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createstation (station :Station , id :number ):Observable<any>
{
return this.http.post(this.baseUrl+"/Stations/"+id ,station);


}
getstations(): Observable<Station[]> {
  return this.http.get<Station[]>(this.baseUrl+"/Stations");
}
deletestation(id: number): Observable<Station>{
  return this.http.delete<Station>(`${this.baseUrl}/Stations/${id}`);
}

findstationById(id: number): Observable<Station>{
  return this.http.get<Station>(`${this.baseUrl}/Stations/${id}`);
}
updtaestation (station :Station,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/Stations/${id}` ,station);


}


}
