import axios from "axios"
import {
  ExposeIndicatorsParams,
  HideIndicatorsParams,
  UpdateIndicatorParams,
} from "@/api/indicator/types"
import apiRoutes from "@/constants/apiRoutes"

export const updateIndicator = ({ id, ...args }: UpdateIndicatorParams) =>
  axios.patch(apiRoutes.admin.indicators.update(id), args)

export const hideIndicators = (arg: HideIndicatorsParams) =>
  axios.patch(apiRoutes.admin.indicators.hide, arg)

export const exposeIndicators = (arg: ExposeIndicatorsParams) =>
  axios.patch(apiRoutes.admin.indicators.expose, arg)
