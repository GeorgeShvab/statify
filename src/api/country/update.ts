import axios from "axios"
import apiRoutes from "@/constants/apiRoutes"
import {
  ExposeCountriesParams,
  HideCountriesParams,
  UpdateCountryParams,
} from "./types"

export const hideCountries = (arg: HideCountriesParams) =>
  axios.patch(apiRoutes.admin.countries.hide, arg)

export const exposeCountries = (arg: ExposeCountriesParams) =>
  axios.patch(apiRoutes.admin.countries.expose, arg)

export const updateCountry = ({ id, ...arg }: UpdateCountryParams) =>
  axios.patch(apiRoutes.admin.countries.update(id), arg)
