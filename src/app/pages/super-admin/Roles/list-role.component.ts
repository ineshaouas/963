import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/model/Role.model';
import { RolesService } from 'src/app/services/Roles.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent {

  currentPage :any = 1;
  itemsPerPage :any = 10;
  role: Role= new Role();
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  roles!: Role[];

  totalroles!: number;
  total !:any
  constructor(
    private  rolesrvice: RolesService,
 
    private toastr: ToastrService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
 this.getRoles()
  }

 
  createrole(){
    this.hideEditForm()
    
  this.rolesrvice.createrole(this.role).subscribe(data=>{
      console.log(data)
      this.toastr.success("Role ajouter avec succès!")
      this.getRoles()
      this.hideAddForm()
    }, error=>{
      console.log(error);
      this.toastr.error("Erreur, Serveur ne répond pas!")
    });
    this.role=new Role();
    

  }

  getRoles(){
    this.role = new Role();
    this.rolesrvice.getroles().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.roles= data;
        this.totalroles = data.length;
        this.total=this.totalroles/10
      }else{
        this.totalroles = 0;
        this.roles = [];
      }
    }, error => {
      this.toastr.warning("Serveur ne répond pas!")
    });
  }

  
  deleterole(role: Role) {
    const permissionId = sessionStorage.getItem("permissionId");
  
    if (role.id === Number(permissionId)) {
      this.toastr.error(" impossible de supprimé Admin Role!")
    }else{


    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this Role!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.rolesrvice.deleterole(role.id).subscribe(data => {
          this.toastr.warning("Role supprimée!")
        
          this.getRoles()
          this.hideAddForm()
          
        }, error => {
          this.toastr.error("Error, server not responding!")
          console.log(error)
        })
      }
    });
  }
  }

  editrole(role: Role) {
    const permissionId = sessionStorage.getItem("permissionId");
    if (role.id === Number(permissionId)) {
      this.toastr.error(" impossible de modifier Admin Role!")
    }else
    {
      this.hideAddForm()
      this.rolesrvice.findroleById(role.id).subscribe(data=>{
        this.role = data;
        this.showEditForm()
      
      });
    }
  
  }
updaterole(role: Role) {
   
    this.rolesrvice.updtaerole(role,role.id).subscribe(data=>{
      this.role = data;
      this.toastr.success("Role Modifier avec succès!")
      this.getRoles()
      this.role=new Role();
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
