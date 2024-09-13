import AdminHeader from "@/layout/admin-header/AdminHeader"
import Footer from "@/layout/footer/Footer"
import Header from "@/layout/header/Header"
import Select from "@/ui/select/Select"
import { PropsWithChildren } from "react"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AdminHeader />
      {children}
      <Footer />
    </>
  )
}
