import { Metadata } from "next/types"
import { SERVER_ADDRESS } from "@/constants/general"
import translate from "@/modules/i18n"

const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
  title: "Statify",
  description: translate("pages.landing.metadata.description_long"),
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: "Statify",
    description: translate("pages.landing.metadata.description"),
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: "Statify",
    description: translate("pages.landing.metadata.description"),
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
  alternates: {
    canonical: SERVER_ADDRESS,
  },
}

export default metadata
