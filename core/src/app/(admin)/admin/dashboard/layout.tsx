import { PropsWithChildren } from "react"
import AdminHeader from "@/layout/admin-header/AdminHeader"
import Footer from "@/layout/footer/Footer"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AdminHeader />
      {children}
      <Footer />
    </>
  )
}
