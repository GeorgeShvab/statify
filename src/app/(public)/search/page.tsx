import IndicatorCard from "@/components/indicator-card/IndicatorCard"
import Pagination from "@/components/pagination/Pagination"
import IndicatorService from "@/services/IndicatorService"
import { PageProps } from "@/types/types"
import SearchIcon from "@/ui/icons/SearchIcon"
import { Metadata } from "next"
import { FC } from "react"

interface SearchParams {
  query: string
  topic?: string
  page?: string
}

const SearchPage: FC<PageProps<{}, SearchParams>> = async ({
  searchParams,
}) => {
  const result = searchParams.query
    ? await IndicatorService.search({
        query: searchParams.query,
        page: searchParams.page ? Number(searchParams.page) : 1,
      })
    : null

  return (
    <div className="flex flex-col min-h-main-dynamic md:min-h-main relative">
      <div className="flex-1">
        <div className="container">
          <h2 className="mb-1.5 md:mb-3 px-2 font-semibold">
            {result ? (
              `Search results for "${searchParams.query}"`
            ) : (
              <>&nbsp;</>
            )}
          </h2>
          {result?.data.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {result.data.map((item) => (
                <IndicatorCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
              <div
                className="flex justify-center mb-6 text-neutral-300"
                aria-hidden={true}
              >
                <SearchIcon className="w-20 h-20" />
              </div>
              <p className="text-center text-neutral-300">
                {result === null
                  ? "Enter a keyword or phrase"
                  : "No datasets found"}
              </p>
            </div>
          )}
        </div>
      </div>
      {searchParams.query && !!result?.data.length && (
        <div className="container">
          <Pagination pages={result.pages} page={result.page} />
        </div>
      )}
    </div>
  )
}

export const generateMetadata = async ({
  searchParams,
}: PageProps<{}, SearchParams>): Promise<Metadata> => {
  return {
    title: `Results for ${searchParams.query}`,
    description: `Indicator results for ${searchParams.query}`,
    themeColor: "#ffffff",
    openGraph: {
      images: ["/og.png"],
      title: `Results for ${searchParams.query}`,
      description: `Indicator results for ${searchParams.query}`,
      type: "website",
      url: `/search?query=${searchParams.query}&page=${searchParams.page}&topic=${searchParams.topic}`,
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
      canonical: `${process.env.SERVER_ADDRESS}/search`,
    },
  }
}

export default SearchPage