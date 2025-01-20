import * as yup from "yup"
import countryValidationSchema from "@/containers/forms/country-form/validationSchema"
import translate from "@/modules/i18n"

const createCountryValidationSchema = countryValidationSchema.shape({
  id: yup.string().required(translate("validation.id_is_required")),
})

export default createCountryValidationSchema
