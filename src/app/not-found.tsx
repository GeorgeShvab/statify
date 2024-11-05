import { FC } from "react"
import { Metadata } from "next"
import NotFoundIcon from "@/ui/icons/NotFoundIcon"
import Footer from "@/layout/footer/Footer"
import Header from "@/layout/header/Header"
import StatusPage from "@/containers/status-page/StatusPage"
import { SERVER_ADDRESS } from "@/constants/general"

const NotFoundPage: FC = () => {
  return (
    <>
      <Header />
      <StatusPage
        icon={<NotFoundIcon />}
        title={"Page is not found"}
        linkHref="/"
        linkText="To home page"
      />
      <Footer />
    </>
  )
}

export const metadata: Metadata = {
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

export default NotFoundPage
