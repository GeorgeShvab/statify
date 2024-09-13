import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "rgb(var(--black) / <alpha-value>)",
          light: "rgb(var(--black-light) / <alpha-value>)",
          dark: "rgb(var(--black-dark) / <alpha-value>)",
        },
        blue: {
          DEFAULT: "rgb(var(--blue) / <alpha-value>)",
        },
      },
      height: {
        main: "calc(100vh - var(--header-height) - var(--footer-height) - var(--search-bar-height))",
        "main-dynamic":
          "calc(100svh - var(--header-height) - var(--search-bar-height))",
      },
      minHeight: {
        main: "calc(100vh - var(--header-height) - var(--footer-height) - var(--search-bar-height))",
        "main-dynamic":
          "calc(100svh - var(--header-height) - var(--search-bar-height))",
      },
    },
  },
  plugins: [],
}
export default config
