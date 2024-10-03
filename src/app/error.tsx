"use client"

import { FC } from "react"
import ServerErrorIcon from "@/ui/icons/ServerErrorIcon"
import Footer from "@/layout/footer/Footer"
import Header from "@/layout/header/Header"

const Error: FC = () => {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="container">
          <div className="flex flex-col justify-center items-center view-height">
            <div>
              <div className="px-2 md:px-0">
                <div className="flex justify-center mb-16 text-[#121212]">
                  <ServerErrorIcon />
                </div>
                <h1 className="text-center text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6 leading-normal">
                  Server Error
                </h1>
                <div className="text-neutral-400 hover:text-neutral-800 transition-colors text-center">
                  <a href="/">To home page</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Error
