import * as yup from "yup"

const validationSchema = yup.object({
  label: yup.string().max(200).required(),
  description: yup.string().max(1000),
  source: yup.string().max(150).required(),
  dataset: yup.string().max(150),
  unit: yup.string().max(150),
  unitSymbol: yup.string().max(50),
  precision: yup.number().min(0).max(10).required(),
  ranking: yup.number().min(0).max(10).required(),
  hidden: yup.boolean().required(),
  showChart: yup.boolean().required(),
  absolute: yup.boolean().required(),
  searchTags: yup.array(yup.string().max(100).required()),
})

export default validationSchema
