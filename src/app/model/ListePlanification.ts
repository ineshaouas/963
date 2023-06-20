import { User } from "./User"

export class ListePlanification  {
   id !: number
   planificationName !: string
   entre !: string
   sortie !: string
   repos !: string
   users !: User[]
   createdAt!:Date
        updatedAt!: Date
 }