import { ObjectSchema, InferType } from "yup"

// I couldn't find the right type to pass so it would satisfy the schemas I provided
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtendableObjectSchema = ObjectSchema<any, any, any>

export interface PageValidationSchemas<
  TParamsSchema extends ExtendableObjectSchema,
  TSearchParamsSchema extends ExtendableObjectSchema,
> {
  params?: TParamsSchema
  searchParams?: TSearchParamsSchema
}

export interface PageValidationMiddlewareResult<
  TParamsSchema extends ExtendableObjectSchema,
  TSearchParamsSchema extends ExtendableObjectSchema,
> {
  params: InferType<TParamsSchema>
  searchParams: InferType<TSearchParamsSchema>
}
