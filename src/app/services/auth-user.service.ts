import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userauth } from '../model/Userauth';
import { Responses } from '../model/Response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  SESSION ='authenticatedUser'
  isAuthenticated = false;
  public email: String="";
  public password: String ="";
  public nom : string="";
  public tel : string="";
  
  
  constructor(private http: HttpClient 
    ,private router: Router
    ) {

  }
  login( userauth:Userauth)  : Observable<Responses> {
  
    this.email =  userauth.email;
    this.password =  userauth.Mdp;
    this.isAuthenticated = true;       
    return this.http.post<Responses>(`https://localhost:7102/api/auth/login`,userauth);
  }

  savesession(id: number, token: String,role:string ,permissionId : number ,routes : string) {
    sessionStorage.setItem(this.SESSION, token.toString())
    sessionStorage.setItem("id", id.toString())
    sessionStorage.setItem("role", role.toString())
    sessionStorage.setItem("routes", routes.toString())
    sessionStorage.setItem("permissionId", permissionId.toString())
 
  } 


  
  
  isLoggedIn() {
     if (sessionStorage.getItem(this.SESSION) === null) return false
    return true
    
  }
logout(){
  sessionStorage.removeItem(this.SESSION)
  sessionStorage.removeItem("id")
  sessionStorage.removeItem("role")
  //sessionStorage.removeItem("routes")
  sessionStorage.removeItem("permissionId")

  this.isAuthenticated = false;
  this.router.navigate(['/'])
}
}
