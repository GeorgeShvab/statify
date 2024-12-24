import axios from "axios"
import { SERVER_ADDRESS } from "@/constants/general"

const axiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}/api`,
  paramsSerializer: (params) => {
    const serizalizedParams = Object.keys(params).reduce(
      (acc: Record<string, string>, curr: string) => {
        if (!params[curr]) return acc

        return {
          ...acc,
          [curr]: Array.isArray(params[curr])
            ? params[curr].toString()
            : params[curr],
        }
      },
      {}
    )

    return new URLSearchParams(serizalizedParams).toString()
  },
})

export default axiosInstance
