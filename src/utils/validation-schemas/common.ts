import * as yup from "yup"
import schema from "@/utils/validation-schemas/schema"

const searchSchema = {
  searchParams: schema({
    query: yup.string().required(),
  }),
}

const searchParamsStringIdentificatorsSchema = {
  searchParams: schema({
    ids: yup.array(yup.string().required()).required(),
  }),
}

const seachParamsNumberIdentificatorsSchema = {
  searchParams: schema({
    ids: yup.array(yup.number().required()).required(),
  }),
}

export const CommonValidations = {
  searchParamsStringIdentificators: searchParamsStringIdentificatorsSchema,
  seachParamsNumberIdentificators: seachParamsNumberIdentificatorsSchema,
  searchSchema,
}
