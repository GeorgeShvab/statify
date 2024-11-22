import * as yup from "yup"

const editCountryValidationSchema = yup.object({
  name: yup.string().min(3).max(100).required(),
  geoCode: yup.string(),
  iso2Code: yup.string(),
  status: yup.string().required(),
  type: yup.string().required(),
  searchTags: yup.array(yup.string().max(100).required()),
})

export default editCountryValidationSchema
