import axios from "axios"
import { Metadata } from "next/types"
import { IndicatorCountryPageProps } from "@/app/(public)/(with-toolbar)/indicator/[id]/[country]/types"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import { SERVER_ADDRESS } from "@/constants/general"

const IMAGES_HOSTING_ADDRESS = process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS

const generateMetadata = async ({
  params,
}: IndicatorCountryPageProps): Promise<Metadata> => {
  const indicatorPromise = IndicatorService.getById(params.id)
  const countryPromise = CountryService.getById(params.country)

  const [indicator, country] = await Promise.all([
    indicatorPromise,
    countryPromise,
  ])

  let ogImage = "/og.png"

  try {
    if (indicator && country) {
      await axios.head(
        `${IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/${country.id}.png`
      )

      ogImage = `${IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/${country.id}.png`
    }
  } catch {
    // Do nothing if such error occurs. It indicates that there is no image for this indicator. There is no sense of image for some indicators.
  }

  if (!indicator || !country) {
    return {
      metadataBase: new URL(SERVER_ADDRESS),
      title: "Not Found",
      description: "This page is not exist",
      themeColor: "#ffffff",
      openGraph: {
        images: [ogImage],
        title: "Not Found",
        description: "This page is not exist",
        type: "website",
        url: "/",
      },
      twitter: {
        images: [ogImage],
        title: "Statify",
        description: "This page is not exist",
        card: "summary_large_image",
        site: "@Zhorrrro",
      },
    }
  }

  return {
    metadataBase: new URL(SERVER_ADDRESS),
    title: `${indicator.label} in ${country.name}`,
    description: `Statistical data of the ${indicator.label} in ${country.name}. ${indicator.description}`,
    themeColor: "#ffffff",
    openGraph: {
      images: [ogImage],
      title: `${indicator.label} in ${country.name}`,
      description: `Statistical data of the ${indicator.label} in ${country.name}.`,
      type: "website",
      url: `/indicator/${params.id}/${params.country}`,
    },
    twitter: {
      images: [ogImage],
      title: `${indicator.label} in ${country.name}`,
      description: `Statistical data of the ${indicator.label} in ${country.name}.`,
      card: "summary_large_image",
      site: "@Zhorrrro",
    },
    alternates: {
      canonical: `${SERVER_ADDRESS}/indicator/${params.id}/${params.country}`,
    },
  }
}

export default generateMetadata
