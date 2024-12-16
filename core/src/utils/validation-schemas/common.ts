import schema from "@/utils/validation-schemas/api/schema"
import yup from "@/modules/yup"

const pageSchema = yup.number().positive().default(1)

const searchSchema = {
  searchParams: schema({
    query: yup.string().required().sanitize().replaceSpecialCharacters(),
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

const pageableSearchSchema = {
  searchParams: schema({
    query: yup.string().sanitize().replaceSpecialCharacters(),
    page: pageSchema,
  }),
}

const pageableSchema = {
  searchParams: schema({
    page: pageSchema,
  }),
}

export const CommonValidations = {
  searchParamsStringIdentificators: searchParamsStringIdentificatorsSchema,
  seachParamsNumberIdentificators: seachParamsNumberIdentificatorsSchema,
  pageableSearchSchema,
  pageableSchema,
  searchSchema,
}
