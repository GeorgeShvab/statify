import { SigninFormValues } from "@/containers/forms/signin-form/SigninForm.types"
import { ResolverResult } from "react-hook-form"
import { AnyObject, ObjectSchema, ValidationError } from "yup"

const validationResolver =
  <T extends AnyObject>(validationSchema: ObjectSchema<T>) =>
  async (data: T) => {
    try {
      const values = await validationSchema.validate(data, {
        abortEarly: false,
      })

      return {
        values,
        errors: {},
      }
    } catch (errors: unknown) {
      if (!(errors instanceof ValidationError))
        return {
          values: {},
          errors: {},
        }

      return {
        values: {},
        errors: errors.inner.reduce(
          (allErrors, currentError) => ({
            ...allErrors,
            [currentError.path as string]: {
              type: currentError.type ?? "validation",
              message: currentError.message,
            },
          }),
          {}
        ),
      } as unknown as ResolverResult<SigninFormValues>
    }
  }

export default validationResolver
