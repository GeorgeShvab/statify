import xss from "xss"
import * as yup from "yup"
import { AnyObject, Maybe } from "yup"
import replaceSpecialCharacters from "@/utils/replace-special-characters/replaceSpecialCharacters"

declare module "yup" {
  export interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
  > extends yup.Schema<TType, TContext> {
    sanitize(): StringSchema<TType, TContext>
    replaceSpecialCharacters(): StringSchema<TType, TContext>
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

export default yup
