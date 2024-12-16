import { ReactNode } from "react"
import { NextResponse } from "next/server"
import { ValidationError } from "yup"
import parseSearchParams from "@/utils/parse-search-params/parseSearchParams"
import { PageProps } from "@/types/general.types"
import {
  ExtendableObjectSchema,
  PageValidationMiddlewareResult,
  PageValidationSchemas,
} from "@/middlewares/page-validation-middleware/types"

interface ValidationErrorParams {
  spec?: { default?: string }
}

const validateSchema = async (
  schema: ExtendableObjectSchema | undefined,
  value: object
) => {
  if (!schema) return {}

  try {
    return await schema?.validate(value, {
      abortEarly: false,
    })
  } catch (e) {
    if (!(e instanceof ValidationError)) throw new Error("Server Error")

    const values = e.value

    for (const error of e.inner) {
      const params = error?.params as ValidationErrorParams

      const defaultValue = params.spec?.default

      values[error.path as string] = defaultValue
    }

    return values
  }
}

const pageValidationMiddleware = <
  TParamsSchema extends ExtendableObjectSchema,
  TSearchParamsSchema extends ExtendableObjectSchema,
>(
  controller: (
    result: PageValidationMiddlewareResult<TParamsSchema, TSearchParamsSchema>
  ) => ReactNode,
  schemas: PageValidationSchemas<TParamsSchema, TSearchParamsSchema>
) => {
  const wrapper = async (pageProps: PageProps) => {
    try {
      const searchParams = pageProps.searchParams

      const parsedSearchParams = parseSearchParams(searchParams)

      const validatedParams = await validateSchema(
        schemas.params,
        pageProps.params
      )

      const validatedSearchParams = await validateSchema(
        schemas.searchParams,
        parsedSearchParams
      )

      return controller({
        params: validatedParams ?? {},
        searchParams: validatedSearchParams ?? {},
      })
    } catch {
      return new NextResponse(null, { status: 500 })
    }
  }

  return wrapper
}

export default pageValidationMiddleware
