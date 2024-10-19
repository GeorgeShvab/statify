import { ObjectSchema, InferType } from "yup"

// I couldn't find the right type to pass so it would satisfy the schemas I provided
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtendableObjectSchema = ObjectSchema<any, any, any>

export interface ValidationSchemas<
  TBodySchema extends ExtendableObjectSchema,
  TParamsSchema extends ExtendableObjectSchema,
  TSearchParamsSchema extends ExtendableObjectSchema,
> {
  body?: TBodySchema
  params?: TParamsSchema
  searchParams?: TSearchParamsSchema
}

export interface ValidationMiddlewareResult<
  TBodySchema extends ExtendableObjectSchema,
  TParamsSchema extends ExtendableObjectSchema,
  TSearchParamsSchema extends ExtendableObjectSchema,
> {
  body: InferType<TBodySchema>
  params: InferType<TParamsSchema>
  searchParams: InferType<TSearchParamsSchema>
}
