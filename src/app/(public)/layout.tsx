import { PropsWithChildren } from "react"
import Footer from "@/layout/footer/Footer"
import Header from "@/layout/header/Header"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="view-height">{children}</main>
      <Footer />
    </>
  )
}
