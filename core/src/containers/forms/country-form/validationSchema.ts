import * as yup from "yup"
import translate from "@/modules/i18n"

const editCountryValidationSchema = yup.object({
  name: yup
    .string()
    .min(3, translate("validation.name_min_length_exceed"))
    .max(100, translate("validation.name_max_length_exceed"))
    .required(translate("validation.name_is_required")),
  geoCode: yup.string(),
  iso2Code: yup.string(),
  status: yup.string().required(translate("validation.status_is_required")),
  type: yup.string().required(translate("validation.type_is_required")),
  searchTags: yup.array(
    yup
      .string()
      .max(100, translate("validation.search_tag_max_length_exceed"))
      .required(translate("validation.search_tag_is_required"))
  ),
})

export default editCountryValidationSchema
