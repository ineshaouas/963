import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/model/Candidat';
import { ContactService, message } from 'src/app/services/contact.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  candidat :  Candidat = new Candidat ();
  
  constructor( private  _ContactService:ContactService,private router :Router ) { }
  addcondidat()
  { 
    this.candidat.email="empty"
    this.candidat.facebook="empty"
    this.candidat.linkedin="empty"
    this.candidat.datemessage=new Date()
   this._ContactService.create(this.candidat).subscribe(data=>console.log(data))
   this.redirectTo()
  }
  
  redirectTo(){
    this.router.navigate(['/EEF'])
  }


 
  ngOnInit(): void {
  
    this.gotoTop()
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
