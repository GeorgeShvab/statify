import { Metadata } from "next/types"
import { SERVER_ADDRESS } from "@/constants/general"
import translate from "@/modules/i18n"

const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
  title: translate("pages.terms_of_use.metadata.title"),
  description: translate("pages.terms_of_use.metadata.description"),
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: translate("pages.terms_of_use.metadata.title"),
    description: translate("pages.terms_of_use.metadata.description"),
    type: "website",
    url: "/terms",
  },
  twitter: {
    images: ["/og.png"],
    title: translate("pages.terms_of_use.metadata.title"),
    description: translate("pages.terms_of_use.metadata.description"),
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
  alternates: {
    canonical: `${SERVER_ADDRESS}/terms`,
  },
}

export default metadata
