import { NextResponse } from "next/server"
import ValueService from "@/services/value-service/ValueService"
import { ValueValidationSchema } from "@/utils/validation-schemas/api/value"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const PATCH = validationMiddleware(async ({ params, body }) => {
  await ValueService.updateOne({ id: params.value, ...body })

  return new NextResponse(null, { status: 200 })
}, ValueValidationSchema.patch)
