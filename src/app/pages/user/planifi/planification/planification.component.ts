import { Component, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Planification } from 'src/app/model/Planification';
import { PlanificationsService } from 'src/app/services/Planification.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent  {
  total !:any
  currentPage :any = 1;
  itemsPerPage :any = 10;
  
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  Planifications!: Planification[];
  planification: Planification= new Planification();
  totalPlanifications!: number;
  plaForm !: FormGroup;
  constructor(
    private  planificationsrvice: PlanificationsService,
 
    private toastr: ToastrService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.plaForm = new FormGroup({
    planificationName: new FormControl('', Validators.required),
    entre: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    sortie: new FormControl('', Validators.required),
    repos: new FormControl('', Validators.required),
    });
 this.getPlanifications()
  }

 
  createPlanification(){
  this.planificationsrvice.createplanifications(this.planification).subscribe(data=>{
      console.log(data)
      this.toastr.success("Planification ajouter avec succès!")
      this.getPlanifications()
      this.hideAddForm()
    }, error=>{
      console.log(error);
      this.toastr.error("Erreur, Serveur ne répond pas!")
    });
    this.planification=new Planification();
  

  }

  getPlanifications(){
   
    this.planificationsrvice.getplanifications().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.Planifications= data;
        this.totalPlanifications = data.length;
      }else{
        this.totalPlanifications = 0;
        this.Planifications = [];
      }
    }, error => {
      this.toastr.warning("Serveur ne répond pas!")
    });
  }

  
  deletePlanification(Planification: Planification) {
      Swal.fire({
        title: 'Are you sure want to remove?',
        text: 'You will not be able to recover this Role!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
    this.planificationsrvice.deleteplanification(Planification.id).subscribe(data => {
      this.toastr.warning("Planification supprimée!")
    
      this.getPlanifications()
      this.hideAddForm()
      
    }, error => {
      this.toastr.error("Error, server not responding!")
      console.log(error)
    })
  }
});
  }

  editPlanification(Planification: Planification) {
    this.hideAddForm()
    this.planificationsrvice.findplanificationById(Planification.id).subscribe(data=>{
      this.planification = data;
      this.showEditForm()
    
    });
  }
updatePlanification(Planification: Planification) {
   
    this.planificationsrvice.updtaeplanification(Planification,Planification.id).subscribe(data=>{
      this.planification = data;
      this.toastr.success("Planification Modifier avec succès!")
      this.getPlanifications()
     
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
