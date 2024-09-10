import { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import NotFoundIcon from "@/ui/icons/NotFoundIcon"

const Home: FC = () => {
  return (
    <main className="bg-white">
      <div className="container">
        <div className="flex flex-col h-[calc(100svh-var(--header-height))] md:h-[calc(100vh-var(--header-height)-var(--footer-height))] justify-center items-center">
          <div>
            <div className="px-2 md:px-0">
              <div className="flex justify-center mb-16 text-[#121212]">
                <NotFoundIcon />
              </div>
              <h1 className="text-center text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6 leading-normal">
                Page is not found
              </h1>
              <div className="text-neutral-400 hover:text-neutral-800 transition-colors text-center">
                <Link href="/">To home page</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Not Found",
  description: "This page is not exist",
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: "Not Found",
    description: "This page is not exist",
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: "Statify",
    description: "This page is not exist",
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
}

export default Home
