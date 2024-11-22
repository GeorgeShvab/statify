import { Prisma } from "@prisma/client"

const sql = (text: string) => Prisma.sql([text])

export default sql
