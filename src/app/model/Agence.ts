import { Facturation } from "./Facturation"
import { PlanificationParAgence } from "./PlanificationParAgence"
import { Vehicule } from "./Vehicule"
export class Agence {
    id!: number
    name!:string
    address!: string
    email!: string
    raisonSocial!: string
    matricule!: string 
    Facturations!:Facturation  []
    Vehicules!:Vehicule[]
    PlanificationParAgences!:PlanificationParAgence []
    createdAt !: Date
    updatedAt!: Date

    
}