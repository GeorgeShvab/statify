import bcrypt from "bcrypt"
import { UserServiceInterface } from "@/services/user-service/types"
import prisma from "@/prisma"

const UserService: UserServiceInterface = {
  async getById(id) {
    return prisma.user.findUnique({ where: { id } })
  },

  async getByEmail(email) {
    return prisma.user.findUnique({ where: { email } })
  },

  async validate(email, password) {
    const user = await this.getByEmail(email)

    if (!user) return null

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (isPasswordCorrect) return user

    return null
  },
}

export default UserService
