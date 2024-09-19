import apiRoutes from "@/constants/apiRoutes"
import axios from "axios"
import { CreateIndicatorParams } from "./types"

export const createIndicator = (args: CreateIndicatorParams) =>
  axios.post(apiRoutes.admin.indicator.create, args)
