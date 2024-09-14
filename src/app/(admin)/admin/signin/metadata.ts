import { Metadata } from "next"

const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In as administrator to be able to edit data.",
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: "Sign In",
    description: "Sign In as administrator to be able to edit data.",
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: "Sign In",
    description: "Sign In as administrator to be able to edit data.",
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
  alternates: {
    canonical: process.env.SERVER_ADDRESS,
  },
}

export default metadata
