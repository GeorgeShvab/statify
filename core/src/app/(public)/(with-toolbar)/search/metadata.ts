import { Metadata } from "next"
import { SearchPageProps } from "@/app/(public)/(with-toolbar)/search/types"
import { SERVER_ADDRESS } from "@/constants/general"
import translate from "@/modules/i18n"

const generateMetadata = async ({
  searchParams,
}: SearchPageProps): Promise<Metadata> => {
  return {
    metadataBase: new URL(SERVER_ADDRESS),
    title: translate("pages.search.metadata.title", {
      value: searchParams.query,
    }),
    description: translate("pages.search.metadata.description", {
      value: searchParams.query,
    }),
    themeColor: "#ffffff",
    openGraph: {
      images: ["/og.png"],
      title: translate("pages.search.metadata.title", {
        value: searchParams.query,
      }),
      description: translate("pages.search.metadata.description", {
        value: searchParams.query,
      }),
      type: "website",
      url: `/search?query=${searchParams.query}&page=${searchParams.page}`,
    },
    twitter: {
      images: ["/og.png"],
      title: "Statify",
      description: translate("pages.search.metadata.description", {
        value: searchParams.query,
      }),
      card: "summary_large_image",
      site: "@Zhorrrro",
    },
    alternates: {
      canonical: `${SERVER_ADDRESS}/search`,
    },
  }
}

export default generateMetadata
