"use client"

import { FC } from "react"
import AdminDashboardNotFoundView from "@/containers/admin-dashboard/components/admin-dashboard-not-found-view/AdminDashboardNotFoundView"
import ValuesDashboardHeader from "@/containers/values-dashboard-header/ValuesDashboardHeader"
import ValuesDashboardTable from "@/containers/values-dashboard-table/ValuesDashboardTable"
import ValuesDashboardTools from "@/containers/values-dashboard-tools/ValuesDashboardTools"
import { ValuesDashboardProps } from "@/containers/values-dashboard/types"
import { SelectableProvider } from "@/providers/selectable-provider/SelectableProvider"
import { StoreProvider } from "@/providers/store-provider/StoreProvider"
import valuesStore from "@/store/values-store/values-store"

const ValuesDashboard: FC<ValuesDashboardProps> = ({ values, ...props }) => {
  const content = values.length ? (
    <ValuesDashboardTable />
  ) : (
    <AdminDashboardNotFoundView />
  )

  return (
    <SelectableProvider>
      <StoreProvider
        createStore={valuesStore(values)}
        onUpdate={(store) => store.setState({ values })}
        onUpdateDeps={[JSON.stringify(values)]}
      >
        <ValuesDashboardHeader />
        <ValuesDashboardTools {...props} />
        {content}
      </StoreProvider>
    </SelectableProvider>
  )
}

export default ValuesDashboard
