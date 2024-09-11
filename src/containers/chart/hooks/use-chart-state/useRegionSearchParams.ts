import { chartItemsKey } from "@/constants/searchParamsKeys"
import { useEffect, useRef } from "react"

const setParamsArray = (arr: string[]) => {
  const paramsObject = new URLSearchParams(`?${chartItemsKey}=${arr.join(",")}`)

  const params = `${window.location.pathname}?${paramsObject.toString()}`

  const history = { ...window.history.state, as: params, url: params }

  window.history.replaceState(history, "", params)
}

const addRegionToParams = (id: string) => {
  const searchParams = new URL(window.location.href).searchParams

  const oldChartItemParam = searchParams.get(chartItemsKey)?.split(",") || []
  const newChartItemsParam = [...oldChartItemParam, id]

  setParamsArray(newChartItemsParam)
}

const removeRegionFromParams = (id: string) => {
  const searchParams = new URL(window.location.href).searchParams

  const oldChartItemParam = searchParams.get(chartItemsKey)?.split(",") || []
  const newChartItemsParam = oldChartItemParam.filter((item) => item !== id)

  setParamsArray(newChartItemsParam)
}

const useRegionSearchParams = (initial?: string[]) => {
  useEffect(() => {
    if (initial) setParamsArray(initial)
  }, [])

  return { removeRegionFromParams, addRegionToParams }
}

export default useRegionSearchParams
