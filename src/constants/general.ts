const address = process.env.SERVER_ADDRESS

if (!address) throw new Error("No SERVER_ADDRESS env")

export const SERVER_ADDRESS = address
