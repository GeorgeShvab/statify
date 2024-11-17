import * as yup from "yup"
import schema from "@/utils/validation-schemas/schema"
import { downloadFormats } from "@/constants/general"

const postSchema = {
  body: schema({
    id: yup.string().required(),
    label: yup.string().required(),
    description: yup.string(),
    source: yup.string().required(),
    dataset: yup.string(),
    unit: yup.string(),
    unitSymbol: yup.string(),
    precision: yup.number().default(0),
    ranking: yup.number().default(0),
    hidden: yup.boolean().default(true),
    showChart: yup.boolean().default(false),
    absolute: yup.boolean().required(),
    searchTags: yup.array(yup.string().required()),
  }),
}

const patchSchema = {
  body: schema({
    label: yup.string(),
    description: yup.string(),
    source: yup.string(),
    dataset: yup.string(),
    unit: yup.string(),
    unitSymbol: yup.string(),
    precision: yup.number(),
    ranking: yup.number(),
    hidden: yup.boolean(),
    showChart: yup.boolean(),
    absolute: yup.boolean(),
    searchTags: yup.array(yup.string().required()),
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
