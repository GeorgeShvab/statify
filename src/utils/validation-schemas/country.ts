import { AreaType } from "@prisma/client"
import * as yup from "yup"
import schema from "@/utils/validation-schemas/schema"
import { areaTypes, downloadFormats } from "@/constants/general"

const postSchema = {
  body: schema({
    id: yup.string().required(),
    name: yup.string().required(),
    geoCode: yup.string(),
    iso2Code: yup.string(),
    hidden: yup.boolean().required(),
    type: yup.string<AreaType>().oneOf(areaTypes).required(),
    searchTags: yup.array(yup.string().required()),
  }),
}

const patchSchema = {
  body: schema({
    name: yup.string(),
    geoCode: yup.string(),
    iso2Code: yup.string(),
    hidden: yup.boolean(),
    type: yup.string<AreaType>().oneOf(areaTypes),
    searchTags: yup.array(yup.string().required()),
  }),
  params: schema({
    country: yup.string().required(),
  }),
}

const downloadSchema = {
  params: schema({
    country: yup.string().required(),
    indicator: yup.string().required(),
  }),
  searchParams: schema({
    format: yup.string().default(downloadFormats[0]).oneOf(downloadFormats),
  }),
}

export const CountryValidationSchema = {
  post: postSchema,
  patch: patchSchema,
  download: downloadSchema,
}
