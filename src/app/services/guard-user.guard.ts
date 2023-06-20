import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild,Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';


@Injectable({
  providedIn: 'root'
})
export class GuardUserGuard implements CanActivate {
  constructor(private aus:AuthUserService,private router:Router){

  }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   let role= sessionStorage.getItem("role")
   let myroute= sessionStorage.getItem("routes")
    const { routeConfig } = route; // provides the route configuration options
    const { path } = routeConfig as Route; // provides the path of the route

    console.log(myroute)
    //console.log(path)
    
    if (path?.includes('admin') || path?.includes('profile')  ) {
      console.log("hello0")
      if( role?.includes('admin')){
     
        return true
        
      }else
      {
        this.router.navigateByUrl('/');
      }
       
      }
      if ((path?.includes('restrans')  || path?.includes('profile'))&& role?.includes('responsabletransport') ){
     
       
          return true

        }
        if  ((path?.includes('userkey')  || path?.includes('profile'))&& role?.includes('Key-user')) {
        
         
            return true
            
       
         
          }
     console.log()
          if   ((path?.includes('Servicepaie/cotisation') &&path?.includes('profile'))||role?.includes('Servicepaie') ) {
        
         
            return true

          }
          if ((path?.includes('Psmanger/planificationag') ||path?.includes('Psmanger/planification') || path?.includes('profile')) &&role?.includes('Servicepaie')) {
        
              return true
              
         
            }
    this.router.navigateByUrl('/'); // for any other condition, navigate to the res route
    return false;
  }
}