import { Permission } from './../../../model/Permission';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from 'src/app/services/Permissions.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent {
  total !:any
  currentPage :any = 1;
  itemsPerPage :any = 10;
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  Permissions!: Permission[];
  permission: Permission= new Permission();
  totalPermissions!: number;
  datas: ReadonlyArray<string> = [ "Delete", "Update", "Create", "Consulte"];
  checkedItems: string[] = [];
  constructor(
    private  Permissionsrvice: PermissionsService,
 
    private toastr: ToastrService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
 
 this.getPermissions()
  }
  

 
  createPermission(){
 
  this.Permissionsrvice.createpermissions(this.permission).subscribe(data=>{
      console.log(data)
      this.toastr.success("Permission ajouter avec succès!")
      this.getPermissions()
      this.hideAddForm()
    }, error=>{
      console.log(error);
      this.toastr.error("Erreur, Serveur ne répond pas!")
    });
    this.permission=new Permission();
  

  }

  getPermissions(){
   
    this.Permissionsrvice.getpermissions().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.Permissions= data;
        this.totalPermissions = data.length;
      }else{
        this.totalPermissions = 0;
        this.Permissions = [];
      }
    }, error => {
      this.toastr.warning("Serveur ne répond pas!")
    });
  }

  
  deletePermission(Permission: Permission) {
    const permissionId = sessionStorage.getItem("permissionId");

    if (Permission.id === Number(permissionId)) {
      this.toastr.error(" impossible de supprimé Admin Permission!")
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
  
    this.Permissionsrvice.deletepermission(Permission.id).subscribe(data => {
      this.toastr.warning("Permission supprimée!")
    
      this.getPermissions()
      this.hideAddForm()
      
    }, error => {
      this.toastr.error("Error, server not responding!")
      console.log(error)
    })
  }
   });
  }
  }

  editPermission(Permission: Permission) {
    const permissionId = sessionStorage.getItem("permissionId");

    if (Permission.id === Number(permissionId)) {
      this.toastr.error(" impossible de Modifier Admin Permission!")
    }else{
    this.hideAddForm()
    this.Permissionsrvice.findpermissionById(Permission.id).subscribe(data=>{
      this.permission = data;
      this.showEditForm()
    
    });
  }
  }
updatePermission(Permission: Permission) {
   
    this.Permissionsrvice.updtaepermission(Permission,Permission.id).subscribe(data=>{
      this.permission = data;
      this.toastr.success("Permission Modifier avec succès!")
      this.getPermissions()
     
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

  onChange(event: any, item: string) {
 
    if (event.target.checked) {
      this.checkedItems.push(item);
    } else {
      const index = this.checkedItems.indexOf(item);
      if (index !== -1) {
        this.checkedItems.splice(index, 1);
      }
    }
    this.permission.title=this.checkedItems.toString()
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
