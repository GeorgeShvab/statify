import xss from "xss"
import * as yup from "yup"
import { AnyObject, Maybe } from "yup"
import replaceSpecialCharacters from "@/utils/replace-special-characters/replaceSpecialCharacters"

interface ValidationContext {
  recursed?: boolean
}

declare module "yup" {
  export interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
  > extends yup.Schema<TType, TContext> {
    sanitize(): StringSchema<TType, TContext>
    replaceSpecialCharacters(): StringSchema<TType, TContext>
    oneOf(fn: () => Promise<string[]>): StringSchema<TType, TContext>
    transformAllToDefault(): StringSchema<TType, TContext>
    context?: ValidationContext
  }

  export interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
  > extends yup.Schema<TType, TContext> {
    context?: ValidationContext
  }
}

yup.addMethod(yup.string, "replaceSpecialCharacters", function () {
  return this.transform((value) => {
    if (typeof value === "string") {
      return replaceSpecialCharacters(value)
    }
    return value
  })
})

yup.addMethod(yup.string, "sanitize", function () {
  return this.transform((value) => {
    if (typeof value === "string") {
      return xss(value)
    }
    return value
  })
})

yup.addMethod(
  yup.string,
  "oneOf",
  function (value: (() => Promise<string[]>) | (string | number)[]) {
    return this.test("oneOf", "Invalid value", async (v) => {
      if (!v) return false

      if (typeof value === "function") {
        const possibleValues = await value()

        return possibleValues.includes(v)
      }

      return value.includes(v)
    })
  }
)

export default yup
