import axios from "axios"
import { Metadata } from "next/types"
import { IndicatorPageProps } from "@/app/(public)/(with-toolbar)/indicator/[id]/types"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import { SERVER_ADDRESS } from "@/constants/general"

const IMAGES_HOSTING_ADDRESS = process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS

export const generateMetadata = async ({
  params,
}: IndicatorPageProps): Promise<Metadata> => {
  const indicator = await IndicatorService.getById(params.id)
  let ogImage = "/og.png"

  try {
    if (indicator) {
      await axios.head(
        `${IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/WEOWORLD.png`
      )

      ogImage = `${IMAGES_HOSTING_ADDRESS}/og-charts/${indicator.id}/WEOWORLD.png`
    }
  } catch {
    // Do nothing if such error occurs. It indicates that there is no image for this indicator. There is no sense of image for some indicators.
  }

  if (!indicator) {
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
    title: indicator.label,
    description: `Statistical data of ${indicator.label} by country. ${indicator.description}`,
    themeColor: "#ffffff",
    openGraph: {
      images: [ogImage],
      title: indicator.label,
      description: `Statistical data of ${indicator.label} by country.`,
      type: "website",
      url: `/indicator/${params.id}`,
    },
    twitter: {
      images: [ogImage],
      title: indicator.label,
      description: `Statistical data of ${indicator.label} by country.`,
      card: "summary_large_image",
      site: "@Zhorrrro",
    },
    alternates: {
      canonical: `${SERVER_ADDRESS}/indicator/${params.id}`,
    },
  }
}

export default generateMetadata
