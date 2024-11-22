const path = require("path")
const dotenv = require("dotenv")

const projectDir = process.cwd()

const envFile = process.env.ENV_FILE

if (process.env.NODE_ENV === "development") {
  if (!envFile) throw new Error("No env file environment variable")
}

if (envFile) dotenv.config({ path: path.join(projectDir, envFile) })
