const address = process.env.NEXT_PUBLIC_SERVER_ADDRESS

if (!address) throw new Error("No SERVER_ADDRESS env")

export const SERVER_ADDRESS = address

export const possibleSortOrders = ["asc", "desc"] as const

export const defaultSelectValue = "all"

export const areaTypes = ["region", "union", "country", "other"] as const

export const downloadFormats = ["csv", "xlsx"] as const
