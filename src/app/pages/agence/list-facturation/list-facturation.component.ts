import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agence } from 'src/app/model/Agence';
import { Facturation } from 'src/app/model/Facturation';
import { AgencesService } from 'src/app/services/Agences.service';
import { FacturationService } from 'src/app/services/Facturation.service';
import Swal from 'sweetalert2';
import { FormRecord} from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PermissionsService } from 'src/app/services/Permissions.service';
import { Permission } from 'src/app/model/Permission';
@Component({
  selector: 'app-list-facturation',
  templateUrl: './list-facturation.component.html',
  styleUrls: ['./list-facturation.component.css']
})
export class ListFacturationComponent {
  total !:any
  currentPage :any = 1;
  itemsPerPage :any = 10;
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  Facturations!: Facturation[];
  agences!: Agence[];
  facturation: Facturation= new Facturation();
  totalFacturations!: number;
  selectedSortOrderbystate !:string
  term: any ="all";
  FacturationForm !: FormGroup;
  permision!:Permission;
  permissions!: Permission[];
  constructor(
    private  perserv: PermissionsService,
    private  Facturationsrvice: FacturationService,
    private perm :PermissionsService,
    private  agenceser : AgencesService,
    private toastr: ToastrService,
    private router: Router
    
  ) { }
  downloadPDF(facture: Facturation) {
    // Récupérer le chemin d'accès ou l'URL du PDF de la facture
    const pdfUrl = facture.pdfUrl;

    // Télécharger le PDF
    window.open(pdfUrl, '_blank');
  }
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
    this. FacturationForm = new FormGroup({
      DateFacturation: new FormControl('',Validators.required),
      Montant: new FormControl('',Validators.required),
      Devise: new FormControl('',Validators.required),
     });  
 this.getFacturations()
 this.getallagence()
 this.getallpermission()
 this.getperm()
  }
  getallpermission()
  {
    this.perserv.getpermissions().subscribe(d=>{
      this.permissions=d
     // console.log(this.roles)
    })
  }
  getperm()
{ const id=sessionStorage.getItem("permissionId")
  this.perm.findpermissionById(id).subscribe(data=>{
 this.permision=data;
 //console.log(this.permision)
 this.getFacturations()
  })
 
}
  
  ChangeSortOrderbystate(event :any)
  {this.term=event.target.value
   
  }

  public filterCallback = (item: any) => {
    
    return this.Facturations.filter(e=> e.agenceId==this.term)
  };
 getallagence()
 {
  this.agenceser.getAgences().subscribe(data=>{
    this.agences=data;
  })
  
 }
 infoFacturation(Facturation: Facturation) {
 
  this.agenceser.findAgenceById(Facturation.agenceId).subscribe(data=>{
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
   
  
  });
}

 getid(event :any){
this.facturation.agenceId=event.target.value;
 }
  createFacturation(){
    //console.log(this.facturation.agenceId)
  this.Facturationsrvice.createFacturation(this.facturation).subscribe(data=>{
      console.log(data)
      this.toastr.success("Facturation ajouter avec succès!")
      this.getFacturations()
      this.hideAddForm()
    }, error=>{
      console.log(error);
      this.toastr.error("Erreur, Serveur ne répond pas!")
    });
    this.facturation=new Facturation();
  

  }

  getFacturations(){
    if(this.permision.title.toLocaleLowerCase().includes("consulte"))
    {
    this.Facturationsrvice.getFacturation().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.Facturations= data;
        this.totalFacturations = data.length;
        this.total=this.totalFacturations/10
      }else{
        this.totalFacturations = 0;
        this.Facturations = [];
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

  
  deleteFacturation(Facturation: Facturation) {
    if(this.permision.title.toLocaleLowerCase().includes("delete"))
    {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this Facturation!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
  
    this.Facturationsrvice.deleteFacturation(Facturation.id).subscribe(data => {
      this.toastr.warning("Facturation supprimée!")
    
      this.getFacturations()
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

  editFacturation(Facturation: Facturation) {
    this.showEditForm()
    this.Facturationsrvice.findFacturationById(Facturation.id).subscribe(data=>{
   // console.log(data)
      this.facturation = data;
     
    
    });
  }
updateFacturation(Facturation: Facturation) {
   console.log(Facturation)
    this.Facturationsrvice.updtaeFacturation(Facturation,Facturation.id).subscribe(data=>{
      this.facturation = data;
      this.toastr.success("Facturation Modifier avec succès!")
      this.getFacturations()
     
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

  }}
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



