import axios from "axios"
import apiRoutes from "@/constants/apiRoutes"
import {
  CreateCountryParams,
  HideCountriesParams,
  ExposeCountriesParams,
  UpdateCountryParams,
  UpdateIndicatorParams,
  CreateIndicatorParams,
  ExposeIndicatorsParams,
  HideIndicatorsParams,
} from "./types"

export const createIndicator = (args: CreateIndicatorParams) =>
  axios.post(apiRoutes.admin.indicators.create, args)

export const updateIndicator = ({ id, ...args }: UpdateIndicatorParams) =>
  axios.patch(apiRoutes.admin.indicators.update(id), args)

export const hideIndicators = (arg: HideIndicatorsParams) =>
  axios.patch(apiRoutes.admin.indicators.hide, arg)

export const exposeIndicators = (arg: ExposeIndicatorsParams) =>
  axios.patch(apiRoutes.admin.indicators.expose, arg)

export const createCountry = (args: CreateCountryParams) =>
  axios.post(apiRoutes.admin.countries.create, args)

export const hideCountries = (arg: HideCountriesParams) =>
  axios.patch(apiRoutes.admin.countries.hide, arg)

export const exposeCountries = (arg: ExposeCountriesParams) =>
  axios.patch(apiRoutes.admin.countries.expose, arg)

export const updateCountry = ({ id, ...arg }: UpdateCountryParams) =>
  axios.patch(apiRoutes.admin.countries.update(id), arg)
