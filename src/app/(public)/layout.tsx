import Header from "@/layout/header/Header"
import Footer from "@/layout/footer/Footer"
import { PropsWithChildren } from "react"
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
