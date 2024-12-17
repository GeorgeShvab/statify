import { AreaType } from "@prisma/client"
import schema from "@/utils/validation-schemas/api/schema"
import { areaTypes, downloadFormats } from "@/constants/general"
import yup from "@/modules/yup"

const postSchema = {
  body: schema({
    id: yup.string().required().sanitize(),
    name: yup.string().required().sanitize(),
    geoCode: yup.string().sanitize(),
    iso2Code: yup.string().sanitize(),
    hidden: yup.boolean().required(),
    type: yup.string<AreaType>().oneOf(areaTypes).required(),
    searchTags: yup.array(yup.string().required().sanitize()),
  }),
}

const patchSchema = {
  body: schema({
    name: yup.string().sanitize(),
    geoCode: yup.string().sanitize(),
    iso2Code: yup.string().sanitize(),
    hidden: yup.boolean(),
    type: yup.string<AreaType>().oneOf(areaTypes).notRequired(),
    searchTags: yup.array(yup.string().required().sanitize()),
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
