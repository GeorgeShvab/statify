import AdminHeader from "@/layout/admin-header/AdminHeader"
import Footer from "@/layout/footer/Footer"
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
