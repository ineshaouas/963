import { Component } from '@angular/core';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { usersService } from '../services/users.service';
import { AuthUserService } from '../services/auth-user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Userauth } from '../model/Userauth';
import { Role } from '../model/Role.model';
const USER_KEY = 'auth-user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  userauth: Userauth  =new  Userauth()
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  public loginSuccess = false;

  constructor(private router: Router, private userser: AuthUserService) {}

  ngOnInit(): void {}
Validator(control: Userauth): boolean {
    if (control.email.length>5 && control.email.indexOf("@")!=-1 && control.Mdp.length>7) {
        return  true ;
    }
    return false ;
}
  Login() {
   if (this.Validator(this.userauth))
{  
    this.userser.login(this.userauth).subscribe(
      (datas ) => {
     
        if (datas !=null ) {
       
        this.userser.savesession(datas.userId,datas.token,datas.role,datas.permissionId,datas.routes)
          this.invalidLogin = false;
          this.loginSuccess = true;

          this.successMessage = 'Login Successful.';

          this.router.navigate(['/profile']);
        
        } 
       
      
      
    }, (error :HttpErrorResponse) => {
      this.errorMessage=error.error.message ;
      this.invalidLogin=true
      console.log(error)
    });
    
}
else{
  this. errorMessage = 'Email or Password incorrect.';
  this.invalidLogin=true
}
  }
}