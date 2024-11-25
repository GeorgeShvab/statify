import schema from "@/utils/validation-schemas/schema"
import { downloadFormats } from "@/constants/general"
import yup from "@/modules/yup"

const postSchema = {
  body: schema({
    id: yup.string().required().sanitize(),
    label: yup.string().required().sanitize(),
    description: yup.string().sanitize(),
    source: yup.string().required().sanitize(),
    dataset: yup.string().sanitize(),
    unit: yup.string().sanitize(),
    unitSymbol: yup.string().sanitize(),
    precision: yup.number().default(0),
    ranking: yup.number().default(0),
    hidden: yup.boolean().default(true),
    showChart: yup.boolean().default(false),
    absolute: yup.boolean().required(),
    searchTags: yup.array(yup.string().required().sanitize()),
  }),
}

const patchSchema = {
  body: schema({
    label: yup.string().sanitize(),
    description: yup.string().sanitize(),
    source: yup.string().sanitize(),
    dataset: yup.string().sanitize(),
    unit: yup.string().sanitize(),
    unitSymbol: yup.string().sanitize(),
    precision: yup.number(),
    ranking: yup.number(),
    hidden: yup.boolean(),
    showChart: yup.boolean(),
    absolute: yup.boolean(),
    searchTags: yup.array(yup.string().required().sanitize()),
  }),
  params: schema({
    indicator: yup.string().required(),
  }),
}

const downloadSchema = {
  params: schema({
    indicator: yup.string().required(),
  }),
  searchParams: schema({
    format: yup.string().default(downloadFormats[0]).oneOf(downloadFormats),
  }),
}

export const IndicatorValidationSchema = {
  post: postSchema,
  patch: patchSchema,
  download: downloadSchema,
}
