import { Agence } from './../../../model/Agence';
import { Component } from '@angular/core';
import { FormGroup,  FormControl, Validators, FormRecord} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/model/Permission';
import { AgencesService } from 'src/app/services/Agences.service';
import { PermissionsService } from 'src/app/services/Permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-agence',
  templateUrl: './list-agence.component.html',
  styleUrls: ['./list-agence.component.css']
})
export class ListAgenceComponent {
  total !:any 
  currentPage :any = 1;
  itemsPerPage :any = 10;
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  agences!: Agence[];
  agence: Agence= new Agence();
  totalagences!: number;
   permision!:Permission;
   agenceFrom ! : FormGroup;
   term: any ="all";
  constructor(
    private  agencesrvice: AgencesService,
     private perm :PermissionsService,
    private toastr: ToastrService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.agenceFrom = new FormGroup({
      matricule: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      nom: new FormControl('', Validators.required),
      adresse: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      raisonSocial: new FormControl('', Validators.required)
    });
    this. getperm()
    this.getagences()


  }
  ChangeSortOrderbystate(event :any)
  {this.term=event.target.value
   
  }
getperm()
{ const id=sessionStorage.getItem("permissionId")
  this.perm.findpermissionById(id).subscribe(data=>{
 this.permision=data;
 //console.log(this.permision)
 this.getagences()
  })
 
}
 
  createagence(){
    
      this.agencesrvice.createAgence(this.agence).subscribe(data=>{
        console.log(data)
        this.toastr.success("agence ajouter avec succès!")
        this.getagences()
        this.hideAddForm()
      }, error=>{
        console.log(error);
        this.toastr.error("Erreur, Serveur ne répond pas!")
      });
      this.agence=new Agence();
   
 
  

  }

  getagences(){

    if(this.permision.title.toLocaleLowerCase().includes("consulte"))
    {
    this.agencesrvice.getAgences().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.agences= data;
        this.totalagences = data.length;
      }else{
        this.totalagences = 0;
        this.agences = [];
      }
    }, error => {
      this.toastr.warning("Erreur,Serveur ne répond pas!")
    });
  }else{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Consulte Permission  Error Contacté Administrateur !',
     
    })
  }
  }

  
  deleteagence(agence: Agence) {
    if(this.permision.title.toLocaleLowerCase().includes("delete"))
    {
      this.agencesrvice.deleteAgence(agence.id).subscribe(data => {
        this.toastr.warning("Agence supprimée!")
      
        this.getagences()
        this.hideAddForm()
        
      }, error => {
        this.toastr.error("Error, server not responding!")
        console.log(error)
      })
    }else
    {
    
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'DELETE Permission  Error Contacté Administrateur !',
       
      })
    }
  
  }

  editagence(agence: Agence) {
    this.hideAddForm()
    this.gotoTop()
    this.agencesrvice.findAgenceById(agence.id).subscribe(data=>{
      this.agence = data;
      this.showEditForm()
    
    });
  }
updateagence(agence: Agence) {
   
    this.agencesrvice.updtaeAgence(agence,agence.id).subscribe(data=>{
      this.agence = data;
      this.toastr.success("agence Modifier avec succès!")
      this.getagences()
     
      this.hideEditForm()
    }, error => {
      this.toastr.error("Error, server not responding!")
      console.log(error)
    });
  }
  showAddForm() {

    if(this.permision.title.toLocaleLowerCase().includes("create"))
    {
      this.addFormVisible = true;
    }else
    {
   
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Create Permission  Error Contacté Administrateur !',
       
      })
    }
    
   
  }
  hideAddForm() {
    
    this.addFormVisible = false;
  }

  showEditForm() {

    if(this.permision.title.toLocaleLowerCase().includes("update"))
    {
      this.editFormVisible = true;
    }else
    {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Update Permission  Error Contacté Administrateur !',
       
      })
  
    }
    
   
  }
  hideEditForm() {
    this.editFormVisible = false;

    
  }

 

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  redirectToList(){
    this.router.navigate(['/admin'])
  }


}



