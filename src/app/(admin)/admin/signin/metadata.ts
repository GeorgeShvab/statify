import { Metadata } from "next"
import { SERVER_ADDRESS } from "@/constants/general"

const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
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
    canonical: SERVER_ADDRESS,
  },
}

export default metadata
