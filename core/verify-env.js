const throwIfMissing = (...values) => {
  values.forEach((value) => {
    if (!value) {
      throw new Error("Environment variable is missing or empty")
    }
  })
}

throwIfMissing(
  process.env.NEXT_PUBLIC_SERVER_ADDRESS,
  process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS,
  process.env.RESULTS_PER_PAGE,
  process.env.DATABASE_URL,
  process.env.AUTH_SECRET,
  process.env.NEXT_PUBLIC_LANG
)
