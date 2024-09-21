import axios from "axios"
import { CreateIndicatorParams } from "@/api/indicator/types"
import apiRoutes from "@/constants/apiRoutes"

export const createIndicator = (args: CreateIndicatorParams) =>
  axios.post(apiRoutes.admin.indicator.create, args)
