import { Analytics } from "@vercel/analytics/react"
import { PropsWithChildren } from "react"
import "@unocss/reset/tailwind-compat.css"
import "@unocss/reset/tailwind.css"
import { Roboto } from "next/font/google"
import AlertProvider from "@/providers/alert-provider/AlertProvider"
import ConfirmProvider from "@/providers/confirm-provider/ConfirmProvider"
import ModalProvider from "@/providers/modal-provider/ModalProvider"
import "@/styles/globals.css"
import "@/styles/global.scss"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
})

const lang = process.env.NEXT_PUBLIC_LANG

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={lang}>
      <body className={roboto.className}>
        <ConfirmProvider>
          <AlertProvider>
            <ModalProvider>
              <div id="portal" />
              {children}
              <Analytics />
            </ModalProvider>
          </AlertProvider>
        </ConfirmProvider>
      </body>
    </html>
  )
}
