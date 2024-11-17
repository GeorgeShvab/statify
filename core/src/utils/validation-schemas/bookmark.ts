import * as yup from "yup"
import schema from "@/utils/validation-schemas/schema"

const postSchema = {
  body: schema({
    indicator: yup.string().required(),
    country: yup.string().default(null),
  }),
}

const getSchema = {
  searchParams: schema({
    indicator: yup.string().required(),
    country: yup.string().default(null),
  }),
}

export const BookmarkValidationSchema = {
  post: postSchema,
  get: getSchema,
}
