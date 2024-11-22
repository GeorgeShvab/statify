import { Metadata } from "next"
import { SERVER_ADDRESS } from "@/constants/general"

const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
  title: "Not Found",
  description: "This page is not exist",
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: "Not Found",
    description: "This page is not exist",
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: "Statify",
    description: "This page is not exist",
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
}

export default metadata
