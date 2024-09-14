import { Metadata } from "next"

const metadata: Metadata = {
  title: "Values Dashboard",
  description: "Edit values here: add, update or delete.",
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: "Values Dashboard",
    description: "Edit values here: add, update or delete.",
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: "Values Dashboard",
    description: "Edit values here: add, update or delete.",
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
  alternates: {
    canonical: process.env.SERVER_ADDRESS,
  },
}

export default metadata
