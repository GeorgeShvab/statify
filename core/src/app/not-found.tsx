import { FC } from "react"
import NotFoundIcon from "@/ui/icons/NotFoundIcon"
import Footer from "@/layout/footer/Footer"
import Header from "@/layout/header/Header"
import StatusPage from "@/containers/status-page/StatusPage"
import translate from "@/modules/i18n"

export { default as metadata } from "@/app/metadata"

const NotFoundPage: FC = () => {
  return (
    <>
      <Header />
      <StatusPage
        icon={<NotFoundIcon />}
        title={translate("errors.page_not_found")}
        linkHref="/"
        linkText={translate("common.to_home")}
      />
      <Footer />
    </>
  )
}

export default NotFoundPage
