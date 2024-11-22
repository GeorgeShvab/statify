import IndicatorService from "@/services/indicator-service/IndicatorService"

async function generateStaticParams() {
  return []
  const indicators = await IndicatorService.getAll()

  return indicators.map((indicator) => ({
    id: indicator.id,
  }))
}

export default generateStaticParams
