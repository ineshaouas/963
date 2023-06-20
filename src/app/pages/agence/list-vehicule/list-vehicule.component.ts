import { Station } from './../../../model/Station';
import { Circuit } from 'src/app/model/Circuit';
import { FormGroup,   FormRecord} from '@angular/forms';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vehicule } from 'src/app/model/Vehicule';
import { FormControl, Validators } from '@angular/forms';
import { VehiculesService } from 'src/app/services/Vehicules.service';
import Swal from 'sweetalert2';
import { Agence } from 'src/app/model/Agence';
import { AgencesService } from 'src/app/services/Agences.service';
import { Permission } from 'src/app/model/Permission';
import { PermissionsService } from 'src/app/services/Permissions.service';

@Component({
  selector: 'app-list-vehicule',
  templateUrl: './list-vehicule.component.html',
  styleUrls: ['./list-vehicule.component.css']
})
export class ListVehiculeComponent {
  total !:any
  currentPage :any = 1;
  itemsPerPage :any = 10;
  vehicule:Vehicule= new Vehicule();
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  Vehicules!: Vehicule[];
  permissions!: Permission[];
  permision!:Permission;
  vehiculeForm !: FormGroup;

  totalroles!: number;
  totalvehicules!: number 
  builder: any;
  formulaire: any;
 
  agences!: Agence[];
   
  constructor(
    private  vehiculesrvice: VehiculesService,
    private  agenceser : AgencesService,
    private toastr: ToastrService,
    private perm :PermissionsService,
    private router: Router,
    private  perserv: PermissionsService,

  ) { }

  ngOnInit(): void { 
    this.vehiculeForm = new FormGroup({
  immatricule: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(17)]),
  capacite: new FormControl('', Validators.required),
  agenceId: new FormControl('', Validators.required)
    
  });
  this. getperm()
 this.getVehicules()
 this.  getallagence()
  }
  getid(event :any){
    this.vehicule.agenceId=event.target.value;
     }
  getallagence()
 {
  this.agenceser.getAgences().subscribe(data=>{
    this.agences=data;
  })
}
getperm()
{ const id=sessionStorage.getItem("permissionId")
  this.perm.findpermissionById(id).subscribe(data=>{
 this.permision=data;
 //console.log(this.permision)
 this.getVehicules()
  })
 
}
  createVehicule(){
    this.hideEditForm()
    
  this.vehiculesrvice.createvehicule(this.vehicule).subscribe(data=>{
      console.log(data)
      this.toastr.success("vehicule ajouter avec succès!")
      this.getVehicules()
      this.hideAddForm()
    }, error=>{
      console.log(error);
      this.toastr.error("Erreur, Serveur ne répond pas!")
    });
    this.vehicule=new Vehicule();
    

  }

  getVehicules(){
    if(this.permision.title.toLocaleLowerCase().includes("consulte"))
    {
    this.vehicule = new Vehicule();
    this.vehiculesrvice.getvehicule().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.Vehicules= data;
        this.totalvehicules = data.length;
        this.total=this.totalvehicules/10
      }else{
        this.totalvehicules = 0;
        this.Vehicules = [];
      }
    }, error => {
      this.toastr.warning("Serveur ne répond pas!")
    });
  }else{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Consulte Permission  Error Contacté Administrateur !',
     
    })
  }
  }
  deletevehicules(vehicule: Vehicule) {
    if(this.permision.title.toLocaleLowerCase().includes("delete"))
    {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this Role!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
  
    this.vehiculesrvice. deletevehicule(vehicule.id).subscribe(data => {
      this.toastr.warning("vehicule supprimée!")
    
      this.getVehicules()
      this.hideAddForm()
      
    }, error => {
      this.toastr.error("Error, server not responding!")
      console.log(error)
    })
  }
});
  }else
  {
  
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'DELETE Permission  Error Contacté Administrateur !',
     
    })
  }

}
  infovehicule(vehicule: Vehicule) {
    let stations ="";
    vehicule.stations.forEach(element => {
      stations+= " "+element.lieu+","
    });
    this.agenceser.findAgenceById(vehicule.agenceId).subscribe(data=>{
     
      Swal.fire({
        icon: 'info',
        title: data.name,
        html:
          '<div class="swal-info">' +
          ' <p><b>Matricule vehicule:</b> <span>' + vehicule.immatricule + '</span></p>' +
          ' <p><b>Matricule Agence:</b> <span>' + data.matricule + '</span></p>' +
          ' <p><b>Email:</b> <span>' + data.email + '</span></p>' +
          ' <p><b>Adresse:</b> <span>' + data.address + '</span></p>' +
          ' <p><b>Raison Sociale:</b> <span>' + data.raisonSocial + '</span></p>' +
          ' <p><b>Station:</b> <span>' + stations + '</span></p>' +
          '</div>',
        customClass: {
          container: 'swal-container',
          title: 'swal-title',
          htmlContainer: 'swal-html-container',
        }
      });
     
    
    });
  }
  editvehicule(vehicule: Vehicule) {
    this.hideAddForm()
    this.vehiculesrvice.findvehicleById(vehicule.id).subscribe(data=>{
      this.vehicule = data;
      this.showEditForm()
    
    });
  }
updatevehicule(vehicule: Vehicule) {
   
    this.vehiculesrvice.updtaevehicule(vehicule,vehicule.id).subscribe(data=>{
      this.vehicule = data;
      this.toastr.success("Vehicule Modifier avec succès!")
      this.getVehicules()
      this.vehicule=new Vehicule();
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
