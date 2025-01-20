import * as yup from "yup"
import indicatorValidationSchema from "@/containers/forms/indicator-form/validationSchema"
import translate from "@/modules/i18n"

const validationSchema = indicatorValidationSchema.shape({
  id: yup
    .string()
    .max(50, translate("validation.id_max_length_exceed"))
    .required(translate("validation.id_is_required")),
})

export default validationSchema
