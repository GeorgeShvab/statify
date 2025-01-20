import { Metadata } from "next"
import { SERVER_ADDRESS } from "@/constants/general"
import translate from "@/modules/i18n"

const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
  title: translate("pages.signin.metadata.title"),
  description: translate("pages.signin.metadata.description"),
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: translate("pages.signin.metadata.title"),
    description: translate("pages.signin.metadata.description"),
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: translate("pages.signin.metadata.title"),
    description: translate("pages.signin.metadata.description"),
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
  alternates: {
    canonical: SERVER_ADDRESS,
  },
}

export default metadata
