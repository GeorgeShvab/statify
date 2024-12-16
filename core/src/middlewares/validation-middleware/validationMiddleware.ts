import { NextRequest, NextResponse } from "next/server"
import parseSearchParams from "@/utils/parse-search-params/parseSearchParams"
import {
  ExtendableObjectSchema,
  ValidationMiddlewareResult,
  ValidationSchemas,
} from "@/middlewares/validation-middleware/types"

const validationMiddleware = <
  TBodySchema extends ExtendableObjectSchema,
  TParamsSchema extends ExtendableObjectSchema,
  TSearchParamsSchema extends ExtendableObjectSchema,
>(
  controller: (
    result: ValidationMiddlewareResult<
      TBodySchema,
      TParamsSchema,
      TSearchParamsSchema
    >,
    req: NextRequest
  ) => Promise<NextResponse>,
  schemas: ValidationSchemas<TBodySchema, TParamsSchema, TSearchParamsSchema>
) => {
  const wrapper = async (
    req: NextRequest,
    { params }: { params: Record<string, string> }
  ) => {
    const body = await req.json().catch(() => ({})) // .json method throws error if body is null. it brokes my validator.

    const searchParamsObject = new URLSearchParams(req.nextUrl.searchParams)

    const searchParams = Object.fromEntries(searchParamsObject.entries())

    const parsedSearchParams = parseSearchParams(searchParams)

    try {
      const validatedBody = await schemas.body?.validate(body)

      const validatedParams = await schemas.params?.validate(params)
      const validatedSearchParams =
        await schemas.searchParams?.validate(parsedSearchParams)

      return controller(
        {
          params: validatedParams ?? {},
          body: validatedBody ?? {},
          searchParams: validatedSearchParams ?? {},
        },
        req
      )
    } catch {
      return new NextResponse(null, { status: 400 })
    }
  }

  return wrapper
}

export default validationMiddleware
