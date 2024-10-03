import { Metadata } from "next/types"
import { SERVER_ADDRESS } from "@/constants/general"

export const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
  title: "Statify",
  description:
    "Explore our database featuring 100+ indicators for hundreds of regions worldwide. Create customizable charts, view trends, and access hundreds of thousands of data points.",
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: "Statify",
    description:
      "Explore our database featuring 100+ indicators for hundreds of regions worldwide.",
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: "Statify",
    description:
      "Explore our database featuring 100+ indicators for hundreds of regions worldwide.",
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
  alternates: {
    canonical: SERVER_ADDRESS,
  },
}

export default metadata
