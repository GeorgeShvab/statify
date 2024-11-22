import * as yup from "yup"

const valueFormValidationSchema = yup.object({
  value: yup.number().required(),
  year: yup.number().required(),
  indicatorId: yup.string().required(),
  countryId: yup.string().required(),
})

export default valueFormValidationSchema
