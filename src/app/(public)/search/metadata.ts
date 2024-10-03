import { Metadata } from "next"
import { SearchPageProps } from "@/app/(public)/search/types"
import { SERVER_ADDRESS } from "@/constants/general"

const generateMetadata = async ({
  searchParams,
}: SearchPageProps): Promise<Metadata> => {
  return {
    metadataBase: new URL(SERVER_ADDRESS),
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
      canonical: `${SERVER_ADDRESS}/search`,
    },
  }
}

export default generateMetadata
