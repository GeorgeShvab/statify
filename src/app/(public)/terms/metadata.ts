import { Metadata } from "next/types"
import { SERVER_ADDRESS } from "@/constants/general"

export const metadata: Metadata = {
  metadataBase: new URL(SERVER_ADDRESS),
  title: "Terms of Use",
  description:
    "Terms of Use of Statify. By using our website, you agree to comply with and be bound by the following terms of use. Please read these terms carefully before using Statify.",
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: "Terms of Use",
    description:
      "Terms of Use of Statify. By using our website, you agree to comply with and be bound by the following terms of use. Please read these terms carefully before using Statify.",
    type: "website",
    url: "/terms",
  },
  twitter: {
    images: ["/og.png"],
    title: "Terms of Use",
    description:
      "Terms of Use of Statify. By using our website, you agree to comply with and be bound by the following terms of use. Please read these terms carefully before using Statify.",
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
  alternates: {
    canonical: `${SERVER_ADDRESS}/terms`,
  },
}

export default metadata
