import { ObjectForFlattening } from "@/utils/flatten-object/flattenObject.types"

const flattenObject = (object: ObjectForFlattening, prefix: string = "") => {
  let res: Record<string, string> = {}

  Object.keys(object).forEach((key) => {
    const propKey = `${prefix}${prefix ? "." : ""}${key}`

    if (typeof object[key] === "object") {
      const propertyRes = flattenObject(
        object[key] as ObjectForFlattening,
        propKey
      )

      res = { ...res, ...propertyRes }
    } else {
      res[propKey] = object[key] as string
    }
  })

  return res
}

export default flattenObject
