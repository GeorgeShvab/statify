declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SERVER_ADDRESS: string
      NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS: string
      RESULTS_PER_PAGE: string
      DATABASE_URL: string
      AUTH_SECRET: string
    }
  }
}
