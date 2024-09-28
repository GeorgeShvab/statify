import axios from "axios"
import {
  ExposeCountriesParams,
  HideCountriesParams,
  UpdateCountryParams,
} from "@/api/country/types"
import apiRoutes from "@/constants/apiRoutes"

export const hideCountries = (arg: HideCountriesParams) =>
  axios.patch(apiRoutes.admin.countries.hide, arg)

export const exposeCountries = (arg: ExposeCountriesParams) =>
  axios.patch(apiRoutes.admin.countries.expose, arg)

export const updateCountry = ({ id, ...arg }: UpdateCountryParams) =>
  axios.patch(apiRoutes.admin.countries.update(id), arg)
