import * as yup from "yup"
import schema from "@/utils/validation-schemas/api/schema"

const postBookmarkSchema = {
  params: schema({
    indicator: yup.string().required(),
  }),
}

const getBookmarkSchema = {
  params: schema({
    indicator: yup.string().required(),
  }),
}

const postBookmarkWithCountrySchema = {
  params: schema({
    indicator: yup.string().required(),
    country: yup.string().required(),
  }),
}

const getBookmarkWithCountrySchema = {
  params: schema({
    indicator: yup.string().required(),
    country: yup.string().required(),
  }),
}

export const BookmarkValidationSchema = {
  postBookmark: postBookmarkSchema,
  getBookmark: getBookmarkSchema,
  postBookmarkWithCountry: postBookmarkWithCountrySchema,
  getBookmarkWithCountry: getBookmarkWithCountrySchema,
}
