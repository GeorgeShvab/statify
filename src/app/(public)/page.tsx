import { FC, Suspense } from "react"
import { Metadata } from "next"
import SearchBar from "@/components/search-bar/SearchBar"
import SearchBarLoader from "@/components/search-bar/SearchBarLoader"

const Home: FC = () => {
  return (
    <main className="bg-white">
      <div className="container">
        <div className="flex flex-col justify-center items-center view-height">
          <div>
            <div className="px-2 md:px-0">
              <h1 className="text-center text-[42px] md:text-6xl font-bold text-black mb-20 md:mb-16 leading-normal">
                Discover the World through Data
              </h1>
              <div className="flex justify-center">
                <div className="mb-8 md:mb-8 max-w-[700px] w-full [&>div>form>div>div>div>div]:bg-neutral-50 [&>div>form>div>div>div>div>input]:bg-neutral-50">
                  <Suspense
                    fallback={
                      <SearchBarLoader placeholder="Example: Birth rate" />
                    }
                  >
                    <SearchBar placeholder="Example: Birth rate" />
                  </Suspense>
                </div>
              </div>
              <div className="md:flex md:justify-center">
                <p className="text-center leading-6 text-gray-400 max-w-[600px] text-[13px] md:text-base">
                  Explore our database featuring 100+ indicators for hundreds of
                  regions worldwide. Create customizable charts, view trends,
                  and access hundreds of thousands of data points.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Statify",
  description:
    "Explore our database featuring 100+ indicators for hundreds of regions worldwide. Create customizable charts, view trends, and access hundreds of thousands of data points.",
  themeColor: "#ffffff",
  openGraph: {
    images: ["/og.png"],
    title: "Statify",
    description:
      "Explore our database featuring 100+ indicators for hundreds of regions worldwide.",
    type: "website",
    url: "/",
  },
  twitter: {
    images: ["/og.png"],
    title: "Statify",
    description:
      "Explore our database featuring 100+ indicators for hundreds of regions worldwide.",
    card: "summary_large_image",
    site: "@Zhorrrro",
  },
  alternates: {
    canonical: process.env.SERVER_ADDRESS,
  },
}

export default Home
