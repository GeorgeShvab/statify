const address = process.env.NEXT_PUBLIC_SERVER_ADDRESS

if (!address) throw new Error("No SERVER_ADDRESS env")

export const SERVER_ADDRESS = address

export const possibleSortOrders = ["asc", "desc"] as const

export const defaultSelectValue = "all"

export const areaTypes = ["region", "union", "country", "other"] as const

export const downloadFormats = ["csv", "xlsx"] as const

export const chartColors = [
  "#FF5733",
  "#33A1FF",
  "#FF33B5",
  "#33FF57",
  "#FFEB33",
  "#FF5733",
  "#9B33FF",
  "#33FFD7",
  "#FF8C33",
  "#3383FF",
  "#FF3333",
  "#33FF83",
  "#FFD433",
  "#335BFF",
  "#FF33A8",
]
