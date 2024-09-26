import { FC } from "react"
import { StoreApi } from "zustand"
import Table from "@/ui/table/Table"
import { useContextStore } from "@/providers/store-provider/StoreProvider"
import { CountriesStore } from "@/store/countries-store/types"
import { CountryWithDatapoints } from "@/types/types"
import "./styles.scss"
import CountriesDashboardTableHead from "./components/countries-dashboard-table-head/CountriesDashboardTableHead"
import CountriesDashboardTableRow from "./components/countries-dashboard-table-row/CountriesDashboardTableRow"

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
