"use client"

import ServerErrorIcon from "@/ui/icons/ServerErrorIcon"
import { FC } from "react"

const Error: FC = () => {
  return (
    <main className="bg-white">
      <div className="container">
        <div className="flex flex-col h-[calc(100svh-var(--header-height))] md:h-[calc(100vh-var(--header-height)-var(--footer-height))] justify-center items-center">
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
  )
}

export default Error
