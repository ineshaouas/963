import { message } from './../services/Vehicules.service';
import { Permission } from 'src/app/model/Permission';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { User } from 'src/app/model/User';
import { AuthUserService } from '../services/auth-user.service';
import { usersService } from '../services/users.service';
import { Role } from '../model/Role.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private Userservice :usersService
    ,private toastr: ToastrService, private router:Router ,  private auth :AuthUserService
    ) { }
user :User=new User()
check:boolean =false ;
cpassword :String="" ;
npassword :String |any ="" ;
id!:number
  ngOnInit(): void {
    this.getusers ()
  }
getusers ()
{
 const id= sessionStorage.getItem("id")
  this.Userservice.findUserById(id).subscribe(
    data=>{
 this.user=data;
    }
  )

}

show(){
  this.check=true;
 
}
hide(){
  this.check=false;

}

edit() 
{

  
  if (this.cpassword .length==0 &&this.npassword .length==0)
  {
 

console.log(this.user)
this.user.cotisations=[]
this.user.role=new Role()
this.user.permission=new Permission()
    this.Userservice.updtaeUser(this.user ,this.user.id).subscribe(data=> 
      { 
                  console.log(data)
                  this.user=data ;
                  this.toastr.success("Edit avec succès");
                  this.router.navigate(['/profile']);
          
        }
          
        ),(err:HttpErrorResponse)=>
        {
          console.log(err.error.message)
        }
  }
  else{
 if (this.cpassword==this.user.password && this.npassword .length>5)
 {
this.user.password=this.npassword 

this.Userservice.findUserById(this.user).subscribe(data=> 
  { 
              console.log(data)
              this.user=data ;
              this.toastr.success("Edit avec succès");
              this.router.navigate(['/home']);
      
    }
      
    );

 }
 else
 {
  this.toastr.error("Failed password");
 }
 
  }
 
}

 


}
