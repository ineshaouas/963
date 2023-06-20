
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../model/User';
export class message 
{
  constructor ( public mesage :string){}
}
@Injectable({
  providedIn: 'root'
})
export class usersService {
  private baseUrl = "https://localhost:7102/api";


  constructor(private http: HttpClient) {}
  
createUser (User :User ):Observable<any>
{
return this.http.post<User>(this.baseUrl+"/users" ,User);


}
getusers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl+"/users");
}
deleteUser(id: number): Observable<User>{
  return this.http.delete<User>(`${this.baseUrl}/users/${id}`);
}

findUserById(id: any): Observable<User>{
  return this.http.get<User>(`${this.baseUrl}/users/${id}`);
}
updtaeUser (User :User,id :number ):Observable<any>
{
return this.http.put(this.baseUrl+`/users/${id}` ,User);


}


}
