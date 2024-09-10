import prisma from "@/prisma"
import bcrypt from "bcrypt"

const UserService = {
  async getById(id: number) {
    return prisma.user.findUnique({ where: { id } })
  },

  async getByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async validate(email: string, password: string) {
    const user = await this.getByEmail(email)

    if (!user) return null

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (isPasswordCorrect) return user

    return null
  },
}

export default UserService
