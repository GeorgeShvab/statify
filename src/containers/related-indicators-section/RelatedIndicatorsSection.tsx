import { FC } from "react"
import { Indicator } from "@prisma/client"
import IndicatorCard from "@/components/indicator-card/IndicatorCard"

interface RelatedIndicatorsSectionProps {
  relatedIndicators: Indicator[]
}

const RelatedIndicatorsSection: FC<RelatedIndicatorsSectionProps> = ({
  relatedIndicators,
}) => {
  return (
    <section className="container">
      <div>
        <h2 className="mb-2 md:mb-3 px-2 font-semibold">Related indicators</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {relatedIndicators.map((item) => (
          <IndicatorCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}

export default RelatedIndicatorsSection
