import { FC } from "react"
import NotFoundIcon from "@/ui/icons/NotFoundIcon"
import Footer from "@/layout/footer/Footer"
import Header from "@/layout/header/Header"
import StatusPage from "@/containers/status-page/StatusPage"

export { default as metadata } from "@/app/metadata"

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

export default NotFoundPage
