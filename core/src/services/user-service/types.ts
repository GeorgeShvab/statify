import { User } from "@prisma/client"

export interface UserServiceInterface {
  getById: (id: number) => Promise<null | User>
  getByEmail: (email: string) => Promise<null | User>
  validate: (email: string, password: string) => Promise<null | User>
}
