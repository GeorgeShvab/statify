import { Value } from "@prisma/client"
import { Option } from "@/ui/select/Select.types"
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
  ValuesQueryParams,
} from "@/api/admin/types"
import apiRoutes from "@/constants/apiRoutes"
import { PageableResult } from "@/types/general.types"
import axiosInstance from "@/modules/axios"

export const createIndicator = (args: CreateIndicatorParams) =>
  axiosInstance.post(apiRoutes.admin.indicators.create, args)

export const updateIndicator = ({ id, ...args }: UpdateIndicatorParams) =>
  axiosInstance.patch(apiRoutes.admin.indicators.update(id), args)

export const hideIndicators = (arg: HideIndicatorsParams) =>
  axiosInstance.patch(apiRoutes.admin.indicators.hide, null, {
    params: arg,
  })

export const exposeIndicators = (arg: ExposeIndicatorsParams) =>
  axiosInstance.patch(apiRoutes.admin.indicators.expose, null, {
    params: arg,
  })

export const createCountry = (args: CreateCountryParams) =>
  axiosInstance.post(apiRoutes.admin.countries.create, args)

export const hideCountries = (arg: HideCountriesParams) =>
  axiosInstance.patch(apiRoutes.admin.countries.hide, null, {
    params: arg,
  })

export const exposeCountries = (arg: ExposeCountriesParams) =>
  axiosInstance.patch(apiRoutes.admin.countries.expose, null, {
    params: arg,
  })

export const updateCountry = ({ id, ...arg }: UpdateCountryParams) =>
  axiosInstance.patch(apiRoutes.admin.countries.update(id), arg)

export const createValue = (args: CreateValueParams) =>
  axiosInstance.post(apiRoutes.admin.values.create, args)

export const updateValue = ({ id, ...args }: UpdateValueParams) =>
  axiosInstance.patch(apiRoutes.admin.values.update(id), args)

export const deleteIndicators = (ids: string[]) =>
  axiosInstance.delete(apiRoutes.admin.indicators.delete, {
    params: { ids: ids.join(",") },
  })

export const deleteCountries = (ids: string[]) =>
  axiosInstance.delete(apiRoutes.admin.countries.delete, {
    params: { ids: ids.join(",") },
  })

export const deleteValues = (ids: number[]) =>
  axiosInstance.delete(apiRoutes.admin.values.delete, {
    params: { ids: ids.join(",") },
  })

export const getAdminValues = (
  params: ValuesQueryParams,
  signal?: AbortSignal
) =>
  axiosInstance.get<PageableResult<Value[]>>(apiRoutes.admin.values.get, {
    params,
    signal,
  })

export const getIndicatorSelectAutocomplete = () =>
  axiosInstance.get<Option[]>(apiRoutes.admin.indicators.autocomplete.select)

export const getCountrySelectAutocomplete = () =>
  axiosInstance.get<Option[]>(apiRoutes.admin.countries.autocomplete.select)
