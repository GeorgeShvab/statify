import { Value } from "@prisma/client"

export interface ValuesDashboardProps {
  values: Value[]
  sort: string
  country: string
  indicator: string
  sortDirection: string
}
