"use client"

import { FC } from "react"
import CountriesDashboardHeader from "@/containers/countries-dashboard-header/CountriesDashboardHeader"
import CountriesDashboardTable from "@/containers/countries-dashboard-table/CountriesDashboardTable"
import CountriesDashboardTools from "@/containers/countries-dashboard-tools/CountriesDashboardTools"
import { CountriesDashboardProps } from "@/containers/countries-dashboard/types"
import { SelectableProvider } from "@/providers/selectable-provider/SelectableProvider"
import { StoreProvider } from "@/providers/store-provider/StoreProvider"
import countriesStore from "@/store/countries-store/countries-store"

const CountriesDashboard: FC<CountriesDashboardProps> = (props) => {
  const key =
    JSON.stringify(props.countries) +
    props.sort +
    props.search +
    props.type +
    props.status +
    props.sortDirection // I use it to reinitialize indicators store.

  return (
    <SelectableProvider>
      <StoreProvider key={key} createStore={countriesStore(props.countries)}>
        <CountriesDashboardHeader />
        <CountriesDashboardTools {...props} />
        <CountriesDashboardTable />
      </StoreProvider>
    </SelectableProvider>
  )
}

export default CountriesDashboard
