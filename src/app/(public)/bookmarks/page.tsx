import IndicatorCard from "@/components/indicator-card/IndicatorCard"
import Pagination from "@/components/pagination/Pagination"
import AdvancedSearchBar from "@/components/search-bar/AdvancedSearchBar"
import BookmarkService from "@/services/BookmarkService"
import { PageProps } from "@/types/types"
import BookmarkIcon from "@/ui/icons/BookmarkIcon"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { FC } from "react"

interface SearchParams {
  page: number
}

const Bookmarks: FC<PageProps<object, SearchParams>> = async ({
  searchParams,
}) => {
  const client = cookies().get("client_id")?.value

  const page = searchParams.page || 1
  const data = client ? await BookmarkService.get({ client, page }) : null

  const emptyView = (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div
        className="flex justify-center mb-8 text-neutral-300"
        aria-hidden={true}
      >
        <BookmarkIcon className="w-20 h-20" />
      </div>
      <p className="text-center text-neutral-300">You have no bookmarks yet</p>
    </div>
  )

  const view = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {data?.data.map((item) => (
        <IndicatorCard key={(item.countryId || "") + item.id} {...item} />
      ))}
    </div>
  )

  const content = data?.data.length ? view : emptyView

  return (
    <main>
      <div className="container">
        <div className="py-3 md:py-5">
          <AdvancedSearchBar />
        </div>
      </div>
      <div className="flex flex-col min-h-main-dynamic md:min-h-main relative">
        <div className="flex-1">
          <div className="container">
            <h2 className="mb-1.5 md:mb-3 px-2 font-semibold">
              Your Bookmarks
            </h2>
            {content}
          </div>
        </div>
        {!!data?.data.length && (
          <div className="container">
            <Pagination pages={data.pages} page={data.page} />
          </div>
        )}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Bookmarks",
  description:
    "Explore our database featuring 100+ indicators for hundreds of regions worldwide.",
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
    canonical: `${process.env.SERVER_ADDRESS}/bookmarks`,
  },
}

export default Bookmarks
