import * as yup from "yup"
import translate from "@/modules/i18n"

const valueFormValidationSchema = yup.object({
  value: yup.number().required(translate("validation.value_is_required")),
  year: yup.number().required(translate("validation.year_is_required")),
  indicatorId: yup
    .string()
    .required(translate("validation.indicator_id_is_required")),
  countryId: yup
    .string()
    .required(translate("validation.country_id_is_required")),
})

export default valueFormValidationSchema
