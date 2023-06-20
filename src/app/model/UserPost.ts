import { Cotisation } from "./Cotisation"
import { Permission } from "./Permission"
import { Role } from "./Role.model"

export class UserPost {
   id  !: number
   nom  !:  string  
   email  !:  string 
   password  !:  string  
   matricule  !:  string  
   adresse  !:  string  
   roleId  !:  number
 
   permissionId  !:  number

   plansection  !:  string  
   segment  !:  string  
   listePlanificationId  !:  number
   shiftId  !: number
 
   salaire  !: number 
   /*
   constructor(
    
      nom: string,
      email: string,
      password: string,
      matricule: string,
      adresse: string,
      roleId: number,
      permissionId: number,
      plansection: string,
      segment: string,
      listePlanificationId: number,
      shiftId: number,
      salaire: number
   ) {
   
      this.nom = nom;
      this.email = email;
      this.password = password;
      this.matricule = matricule;
      this.adresse = adresse;
      this.roleId = roleId;
      this.permissionId = permissionId;
      this.plansection = plansection;
      this.segment = segment;
      this.listePlanificationId = listePlanificationId;
      this.shiftId = shiftId;
      this.salaire = salaire;
   }
*/
}