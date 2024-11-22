import type { Config } from "jest"
import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/(types.{ts,tsx}|*.types.{ts,tsx})",
    "!src/**/*.constants.{js,jsx,ts,tsx}",
    "!src/ui/icons/*.*",
  ],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
