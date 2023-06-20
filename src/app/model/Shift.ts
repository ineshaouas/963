import { User } from "./User"

export class Shift {
  id!: number
  entre!: string
  sortie!: string
  createdAt!:Date
        updatedAt!: Date
  users!:User []
}

