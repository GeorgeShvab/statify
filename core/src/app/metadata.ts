import { Metadata } from "next"
import { SERVER_ADDRESS } from "@/constants/general"
import translate from "@/modules/i18n"

const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
  title: translate("pages.not_found.metadata.title"),
  description: translate("pages.not_found.metadata.description"),
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: translate("pages.not_found.metadata.title"),
    description: translate("pages.not_found.metadata.description"),
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: "Statify",
    description: translate("pages.not_found.metadata.description"),
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
}

export default metadata
