import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Shift } from 'src/app/model/Shift';
import { ShiftsService } from 'src/app/services/Shifts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
export class ShiftListComponent {
  total !:any
  currentPage :any = 1;
  itemsPerPage :any = 10;
 shift: Shift= new Shift();
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  shifts!: Shift[];
  shiftForm!:FormGroup;
  totalshifts!: number;
   
  constructor(
    private  shiftsrvice: ShiftsService,
 
    private toastr: ToastrService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.shiftForm = new FormGroup({
    
      entre: new FormControl('', Validators.required),
      sortie: new FormControl('', Validators.required),
      
      
     
    });


    
        
 this.getshifts()
  }

 
  createshift(){
    this.hideEditForm()
    
  this.shiftsrvice.createshift (this.shift).subscribe(data=>{
      console.log(data)
      this.toastr.success("Shift ajouter avec succès!")
      this.getshifts()
      this.hideAddForm()
    }, error=>{
      console.log(error);
      this.toastr.error("Erreur, Serveur ne répond pas!")
    });
    this.shift=new Shift();
    

  }

  getshifts(){
    this.shift = new Shift();
    this.shiftsrvice.getshifts().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.shifts= data;
        this.totalshifts = data.length;
      }else{
        this.totalshifts = 0;
        this.shifts = [];
      }
    }, error => {
      this.toastr.warning("Serveur ne répond pas!")
    });
  }

  
  deleteshift(shift: Shift) {
      Swal.fire({
        title: 'Are you sure want to remove?',
        text: 'You will not be able to recover this Role!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
  
    this.shiftsrvice.deleteshift(shift.id).subscribe(data => {
      this.toastr.warning("Shift supprimée!")
    
      this.getshifts()
      this.hideAddForm()
      
    }, error => {
      this.toastr.error("Error, server not responding!")
      console.log(error)
    })
  }
});
  }

  editshift(shift: Shift) {
    this.hideAddForm()
    this.shiftsrvice.findshiftById(shift.id).subscribe(data=>{
      this.shift = data;
      this.showEditForm()
    
    });
  }
  updtaeshift(shift: Shift) {
   
    this.shiftsrvice.updtaeshift(shift,shift.id).subscribe(data=>{
      this.shift = data;
      this.toastr.success("Role Modifier avec succès!")
      this.getshifts()
      this.shift=new Shift();
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
