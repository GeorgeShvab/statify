import { Metadata } from "next/types"
import { SERVER_ADDRESS } from "@/constants/general"

const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
  title: "Bookmarks",
  description:
    "Explore our database featuring 100+ indicators for hundreds of regions worldwide.",
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
    canonical: `${SERVER_ADDRESS}/bookmarks`,
  },
}

export default metadata
