import { FC } from "react"
import { StoreApi } from "zustand"
import Table from "@/ui/table/Table"
import CountriesDashboardTableHead from "@/containers/countries-dashboard-table/components/countries-dashboard-table-head/CountriesDashboardTableHead"
import CountriesDashboardTableRow from "@/containers/countries-dashboard-table/components/countries-dashboard-table-row/CountriesDashboardTableRow"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import "@/containers/countries-dashboard-table/styles.scss"
import { CountriesStore } from "@/store/countries-store/types"
import { CountryWithDatapoints } from "@/types/types"

const renderHeader = () => <CountriesDashboardTableHead />

const CountriesDashboardTable: FC = () => {
  const { countries } = useContextStore<StoreApi<CountriesStore>>()

  const renderRow = (item: CountryWithDatapoints) => (
    <CountriesDashboardTableRow key={item.id} country={item} />
  )

  return (
    <div className="countries-dashboard-table__container">
      <Table
        data={countries}
        renderRow={renderRow}
        renderHeader={renderHeader}
      />
    </div>
  )
}

export default CountriesDashboardTable
