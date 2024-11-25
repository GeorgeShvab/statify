import schema from "@/utils/validation-schemas/schema"
import yup from "@/modules/yup"

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

export const CommonValidations = {
  searchParamsStringIdentificators: searchParamsStringIdentificatorsSchema,
  seachParamsNumberIdentificators: seachParamsNumberIdentificatorsSchema,
  searchSchema,
}
