import { Indicator } from "@prisma/client"
import { IndicatorsDashboardTableFormValues } from "@/containers/indicators-dashboard-table/IndicatorsDashboardTable.types"

const getInitialValues = (
  indicators: Indicator[]
): IndicatorsDashboardTableFormValues => {
  return indicators.reduce(
    (acc, curr, index) => ({
      ...acc,
      [`${index}.absolute`]: curr.absolute,
      [`${index}.hidden`]: curr.hidden,
    }),
    {}
  )
}

export default getInitialValues
