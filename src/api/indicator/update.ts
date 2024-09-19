import apiRoutes from "@/constants/apiRoutes"
import { Indicator } from "@prisma/client"
import axios from "axios"
import { UpdateIndicatorParams } from "./types"

export const updateIndicator = ({ id, ...args }: UpdateIndicatorParams) =>
  axios.patch(apiRoutes.admin.indicator.update(id), args)