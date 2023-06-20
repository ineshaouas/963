import { Component } from '@angular/core';
import { Cotisation } from 'src/app/model/Cotisation';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  CotisationsService } from 'src/app/services/Cotisations.service';
import Swal from 'sweetalert2';
import { usersService } from 'src/app/services/users.service';
import { User } from 'src/app/model/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cotisation',
  templateUrl: './cotisation.component.html',
  styleUrls: ['./cotisation.component.css']
})
export class CotisationComponent {
   total !:any
   currentPage :any = 1;
   itemsPerPage :any = 10;
   addFormVisible: boolean = false;
   editFormVisible: boolean = false;
   Cotisation!: Cotisation[];
   cotisation: Cotisation= new Cotisation();
   totalCotisations!: number;
   selectedSortOrderbystate !:string
   term: any ="all";
   user!: User[];
   cotisationForm!:FormGroup;


  constructor(
    private  Cotisationsrvice: CotisationsService,
    private  userser : usersService,
    private toastr: ToastrService,
    private router: Router
    
  ) { }
  ngOnInit(): void {
    this.cotisationForm = new FormGroup({
    mois: new FormControl('', Validators.required),

    montant: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    
    
   
      
     
  });
    this.getCotisations()
    this.getalluser()
  }
  ChangeSortOrderbystate(event :any)
  {this.term=event.target.value
   
  }

  public filterCallback = (item: any) => {
    
    return this.Cotisation.filter(e=> e.userId==this.term)
  };
  getalluser() {
    this.userser.getusers().subscribe(data=>{
      this.user=data;
    })
    
  }
  infoCotisation(Cotisation: Cotisation) {
 
    this.userser.findUserById(Cotisation.userId).subscribe(data=>{
      Swal.fire({
        icon: 'info',
        title: data.nom,
        html:
          '<div class="swal-info">' +
          ' <p><b>Name:</b> <span>' + data.nom + '</span></p>' +
          ' <p><b>Email:</b> <span>' + data.email + '</span></p>' +
          ' <p><b>Matricule:</b> <span>' + data.matricule + '</span></p>' +
          ' <p><b>Plansection:</b> <span>' + data.plansection+ '</span></p>' +
          //'<p><b>Raison Sociale:</b> <span>' + data.plansection + '</span></p>' +

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
      this.cotisation.userId=event.target.value;
       }
       
     createCotisation(){
      this.Cotisationsrvice.createcotisation(this.cotisation).subscribe(data=>{
          console.log(data)
          this.toastr.success("Cotisation ajouter avec succès!")
          this.getCotisations()
          this.hideAddForm()
        }, error=>{
          console.log(error);
          this.toastr.error("Erreur, Serveur ne répond pas!")
        });
        this.cotisation=new Cotisation();
      
    
      }
    
      getCotisations(){
       
        this.Cotisationsrvice.getcotisations().subscribe(data => {
          if(data != null){
            console.log(data.length)
            this.Cotisation= data;
            this.totalCotisations = data.length;
          }else{
            this.totalCotisations = 0;
            this.Cotisation = [];
          }
        }, error => {
          this.toastr.warning("Serveur ne répond pas!")
        });
      }
    
      
      deleteCotisation(Cotisation: Cotisation) {
        
          Swal.fire({
            title: 'Are you sure want to remove?',
            text: 'You will not be able to recover this Role!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
          }).then((result) => {
            if (result.value) {
      
        this.Cotisationsrvice.deleteCotisation(Cotisation.id).subscribe(data => {
          this.toastr.warning("Cotisation supprimée!")
        
          this.getCotisations()
          this.hideAddForm()
          
        }, error => {
          this.toastr.error("Error, server not responding!")
          console.log(error)
        })
          }
});
      }
    
      editCotisation(Cotisation: Cotisation) {
        this.hideAddForm()
        this.Cotisationsrvice.findcotisationById(Cotisation.id).subscribe(data=>{
          this.cotisation = data;
          this.showEditForm()
        
        });
      }
    updateCotisation(Cotisation: Cotisation) {
       
        this.Cotisationsrvice.updtaecotisation(Cotisation,Cotisation.id).subscribe(data=>{
          this.Cotisation = data;
          this.toastr.success("Cotisation Modifier avec succès!")
          this.getCotisations()
         
          this.hideEditForm()
        }, error => {
          this.toastr.error("Error, server not responding!")
          console.log(error)
        });
      }
      showAddForm() {
        this.addFormVisible = true;
       
      }
      hideAddForm() {
        this.addFormVisible = false;
      }
    
      showEditForm() {
        this.editFormVisible = true;
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
    
