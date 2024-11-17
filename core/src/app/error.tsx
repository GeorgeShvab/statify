"use client"

import { FC } from "react"
import ServerErrorIcon from "@/ui/icons/ServerErrorIcon"
import Footer from "@/layout/footer/Footer"
import Header from "@/layout/header/Header"
import StatusPage from "@/containers/status-page/StatusPage"

const Error: FC = () => {
  return (
    <>
      <Header />
      <StatusPage
        icon={<ServerErrorIcon />}
        linkText="To home page"
        title="Server Error"
        linkHref="/"
      />
      <Footer />
    </>
  )
}

export default Error
