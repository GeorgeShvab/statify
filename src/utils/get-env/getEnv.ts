const getEnv = (key: string) => {
  const env = process.env[key]

  if (!env) {
    throw new Error(`${key} environment variable is missing or empty`)
  }

  return env
}

export default getEnv
