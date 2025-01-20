"use client"

import { FC } from "react"
import ServerErrorIcon from "@/ui/icons/ServerErrorIcon"
import Footer from "@/layout/footer/Footer"
import Header from "@/layout/header/Header"
import StatusPage from "@/containers/status-page/StatusPage"
import translate from "@/modules/i18n"

const Error: FC = () => {
  return (
    <>
      <Header />
      <StatusPage
        icon={<ServerErrorIcon />}
        linkText={translate("common.to_home")}
        title={translate("errors.server_error")}
        linkHref="/"
      />
      <Footer />
    </>
  )
}

export default Error
