import { Indicator } from "@prisma/client"

const getInitialValues = (indicator: Indicator) => {
  return {
    label: indicator.label ?? "",
    description: indicator.description ?? "",
    source: indicator.source ?? "",
    dataset: indicator.dataset ?? "",
    unit: indicator.unit ?? "",
    unitSymbol: indicator.unitSymbol ?? "",
    precision: indicator.precision,
    ranking: indicator.ranking,
    hidden: indicator.hidden,
    showChart: indicator.showChart,
    absolute: indicator.absolute,
    searchTags: indicator.searchTags,
  }
}

export default getInitialValues
