import { Metadata } from "next"
import { SERVER_ADDRESS } from "@/constants/general"

const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
  title: "Indicators Dashboard",
  description: "Edit indicators here: add, update or delete.",
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: "Indicators Dashboard",
    description: "Edit indicators here: add, update or delete.",
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: "Indicators Dashboard",
    description: "Edit indicators here: add, update or delete.",
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
  alternates: {
    canonical: SERVER_ADDRESS,
  },
}

export default metadata
