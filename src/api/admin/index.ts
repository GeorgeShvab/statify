import axios from "axios"
import {
  CreateCountryParams,
  HideCountriesParams,
  ExposeCountriesParams,
  UpdateCountryParams,
  UpdateIndicatorParams,
  CreateIndicatorParams,
  ExposeIndicatorsParams,
  HideIndicatorsParams,
  CreateValueParams,
  UpdateValueParams,
} from "@/api/admin/types"
import apiRoutes from "@/constants/apiRoutes"

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

export const createValue = (args: CreateValueParams) =>
  axios.post(apiRoutes.admin.values.create, args)

export const updateValue = ({ id, ...args }: UpdateValueParams) =>
  axios.patch(apiRoutes.admin.values.update(id), args)

export const deleteIndicators = (ids: string[]) =>
  axios.delete(apiRoutes.admin.indicators.delete, {
    params: { ids: ids.join(",") },
  })

export const deleteCountries = (ids: string[]) =>
  axios.delete(apiRoutes.admin.countries.delete, {
    params: { ids: ids.join(",") },
  })

export const deleteValues = (ids: number[]) =>
  axios.delete(apiRoutes.admin.values.delete, {
    params: { ids: ids.join(",") },
  })
