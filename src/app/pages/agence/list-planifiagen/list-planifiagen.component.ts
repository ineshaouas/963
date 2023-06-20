import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlanificationParAgence } from 'src/app/model/PlanificationParAgence';
import Swal from 'sweetalert2';
import { PlanificationParAgencesService } from 'src/app/services/PlanificationParAgences.service';
import { Agence } from 'src/app/model/Agence';
import { AgencesService } from 'src/app/services/Agences.service';
import { StationsService } from 'src/app/services/Stations.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Permission } from 'src/app/model/Permission';
import { PermissionsService } from 'src/app/services/Permissions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  FormRecord} from '@angular/forms';

@Component({
  selector: 'app-list-planifiagen',
  templateUrl: './list-planifiagen.component.html',
  styleUrls: ['./list-planifiagen.component.css']
})
export class ListPlanifiagenComponent {
  currentPage :any = 1;
  itemsPerPage :any = 10;
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  PlanificationParAgences !: PlanificationParAgence[];
  PlanificationParagence: PlanificationParAgence= new PlanificationParAgence();
  totalPlanificationParAgences!: number;
  total !:any
  agences!: Agence[];
  permissions!: Permission[];
  permision!:Permission;
planiFrom !: FormGroup;
  
  term: string="all";
  constructor(
    private  PlanificationParAgencesrvice: PlanificationParAgencesService,
    private  agenceser : AgencesService,
    private perm :PermissionsService,

    private toastr: ToastrService,
    private router: Router
    
  ) { }
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

  ngOnInit(): void {
    this.planiFrom = new FormGroup({
      nbbus:new FormControl('', Validators.required),
      capacite :new FormControl('', Validators.required),

    });
 this.getPlanificationParAgences()
 this.getallagence()
 this. getperm()

  }
  getperm()
{ const id=sessionStorage.getItem("permissionId")
  this.perm.findpermissionById(id).subscribe(data=>{
 this.permision=data;
 //console.log(this.permision)
 this.getPlanificationParAgences()
  })
 
}

  ChangeSortOrderbystate(event :any)
  {this.term=event.target.value
   
  }
  getid(event :any){
    this.PlanificationParagence.agenceId=event.target.value;
     }
  getallagence()
 {
  this.agenceser.getAgences().subscribe(data=>{
    let a=new Agence()
 
    this.agences=data;
  })
  
 }
 getagencename(id :number)
 {
  this.agenceser.findAgenceById(id).subscribe(data=>{
    return data.name;
  })
 }
  createPlanificationParAgence(){
    this.PlanificationParAgencesrvice.createPlanificationParAgences(this.PlanificationParagence).subscribe(data=>{
        console.log(data)
        this.toastr.success("Liste ajouter avec succès!")
        this.getPlanificationParAgences()
        this.hideAddForm()
      }, error=>{
        console.log(error);
        this.toastr.error("Erreur, Serveur ne répond pas!")
      });
      this.PlanificationParagence=new PlanificationParAgence ();
  

  }
  getPlanificationParAgences(){
    if(this.permision.title.toLocaleLowerCase().includes("consulte"))
    {
    this.PlanificationParAgencesrvice.getPlanificationParAgences().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.PlanificationParAgences= data;
        this.totalPlanificationParAgences = data.length;
        this.total=this.totalPlanificationParAgences/10
      }else{
        this.totalPlanificationParAgences = 0;
        this.PlanificationParAgences = [];
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

  
  deletePlanificationParAgence(PlanificationParAgence: PlanificationParAgence) {
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
      this.PlanificationParAgencesrvice.deletePlanificationParAgence(PlanificationParAgence.id).subscribe(data => {
      this.toastr.warning("Permission supprimée!")
    
      this.getPlanificationParAgences()
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
  infoPlanificationParAgence(PlanificationParAgence: PlanificationParAgence) {
    this.agenceser.findAgenceById(PlanificationParAgence.agenceId).subscribe(data=>{
      Swal.fire({
        icon: 'info',
        title: data.name,
        html:
          '<div class="swal-info">' +
          ' <p><b>Matricule:</b> <span>' + data.matricule + '</span></p>' +
          ' <p><b>Email:</b> <span>' + data.email + '</span></p>' +
          ' <p><b>Adresse:</b> <span>' + data.address + '</span></p>' +
          ' <p><b>Raison Sociale:</b> <span>' + data.raisonSocial + '</span></p>' +
          '</div>',
        customClass: {
          container: 'swal-container',
          title: 'swal-title',
          htmlContainer: 'swal-html-container',
        }
      });
    })
    
 
  }
  editPlanificationParAgence(PlanificationParAgence: PlanificationParAgence) {
    this.hideAddForm()
    this.PlanificationParAgencesrvice.findPlanificationParAgenceById(PlanificationParAgence.id).subscribe(data=>{
      this.PlanificationParagence = data;
      this.showEditForm()
    
    });
  }
updatePlanificationParAgence(PlanificationParAgence: PlanificationParAgence) {
   
    this.PlanificationParAgencesrvice.updtaePlanificationParAgence(PlanificationParAgence,PlanificationParAgence.id).subscribe(data=>{
      this.PlanificationParagence = data;
      this.toastr.success("Permission Modifier avec succès!")
      this.getPlanificationParAgences()
     
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



