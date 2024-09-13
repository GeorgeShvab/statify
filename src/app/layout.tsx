import "@/styles/globals.css"
import { Roboto } from "next/font/google"
import AlertProvider from "@/providers/alert-provider/AlertProvider"
import ModalProvider from "@/providers/modal-provider/ModalProvider"
import { PropsWithChildren } from "react"
import { Analytics } from "@vercel/analytics/react"
import "@/styles/global.scss"
import Select from "@/ui/select/Select"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-neutral-50`}>
        <AlertProvider>
          <ModalProvider>
            <div id="portal" />
            {children}
            <Analytics />
          </ModalProvider>
        </AlertProvider>
      </body>
    </html>
  )
}
