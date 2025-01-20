import * as yup from "yup"
import translate from "@/modules/i18n"

const validationSchema = yup.object({
  label: yup
    .string()
    .max(200, translate("validation.label_max_length_exceed"))
    .required(translate("validation.label_is_required")),
  description: yup
    .string()
    .max(1000, translate("validation.description_max_length_exceed")),
  source: yup
    .string()
    .max(150, translate("validation.source_max_length_exceed"))
    .required(translate("validation.source_is_required")),
  dataset: yup
    .string()
    .max(150, translate("validation.dataset_max_length_exceed")),
  unit: yup.string().max(150, translate("validation.unit_max_length_exceed")),
  unitSymbol: yup
    .string()
    .max(50, translate("validation.unit_symbol_max_length_exceed")),
  precision: yup
    .number()
    .min(0, translate("validation.precision_min_value_exceed"))
    .max(10, translate("validation.precision_max_value_exceed"))
    .required(translate("validation.precision_is_required")),
  ranking: yup
    .number()
    .min(0, translate("validation.ranking_min_value_exceed"))
    .max(10, translate("validation.ranking_max_value_exceed"))
    .required(translate("validation.ranking_is_required")),
  hidden: yup.boolean().required(translate("validation.hidden_is_required")),
  showChart: yup
    .boolean()
    .required(translate("validation.show_chart_is_required")),
  absolute: yup
    .boolean()
    .required(translate("validation.absolute_is_required")),
  searchTags: yup.array(
    yup
      .string()
      .max(100, translate("validation.search_tag_max_length_exceed"))
      .required(translate("validation.search_tag_is_required"))
  ),
})

export default validationSchema
