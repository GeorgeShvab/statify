import axios from "axios"
import { CreateCountryParams } from "@/api/country/types"
import apiRoutes from "@/constants/apiRoutes"

export const createCountry = (args: CreateCountryParams) =>
  axios.post(apiRoutes.admin.countries.create, args)
