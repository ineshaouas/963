import { Component } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent {
  constructor( private auth:AuthUserService)
  {
  
  }
  
  logout()
  { 
    this.auth.logout()
  }
}
