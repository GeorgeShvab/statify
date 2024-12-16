import { NextResponse } from "next/server"
import ValueService from "@/services/value-service/ValueService"
import { ValueValidationSchema } from "@/utils/validation-schemas/api/value"
import { CommonValidations } from "@/utils/validation-schemas/common"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const POST = validationMiddleware(async ({ body }) => {
  await ValueService.createOne(body)

  return new NextResponse(null, { status: 201 })
}, ValueValidationSchema.post)

export const DELETE = validationMiddleware(async ({ searchParams }) => {
  await ValueService.deleteMany(searchParams.ids)

  return new NextResponse(null, { status: 200 })
}, CommonValidations.seachParamsNumberIdentificators)

export const GET = validationMiddleware(
  async ({
    searchParams: { sort, sortDirection, indicator, country, page, size },
  }) => {
    const skip = page * size

    const { data, count } = await ValueService.getForAdmin({
      sort,
      take: size,
      skip,
      sortDirection,
      country: country === "all" ? undefined : country,
      indicator: indicator === "all" ? undefined : indicator,
    })

    const pages = Math.ceil(count / size)

    return NextResponse.json({ data, pages, page })
  },
  ValueValidationSchema.get
)
