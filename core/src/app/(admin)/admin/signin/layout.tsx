import Header from "@/layout/header/Header"
import Footer from "@/layout/footer/Footer"
import { PropsWithChildren } from "react"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
