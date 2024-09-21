import axios from "axios"
import { UpdateIndicatorParams } from "@/api/indicator/types"
import apiRoutes from "@/constants/apiRoutes"

export const updateIndicator = ({ id, ...args }: UpdateIndicatorParams) =>
  axios.patch(apiRoutes.admin.indicator.update(id), args)
