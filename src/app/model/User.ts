import { Cotisation } from "./Cotisation"
import { Permission } from "./Permission"
import { Role } from "./Role.model"

export class User {
   id  !: number
   nom  !:  string  
   email  !:  string 
   password  !:  string  
   matricule  !:  string  
   adresse  !:  string  
   roleId  !:  number
   role  !: Role
   permissionId  !:  number
   permission  !: Permission
   plansection  !:  string  
   segment  !:  string  
   listePlanificationId  !:  number
   shiftId  !: number
   token  !:  string  
   salaire  !: number 
   cotisations  !: Cotisation[]
   createdAt!:Date
        updatedAt!: Date
  
}