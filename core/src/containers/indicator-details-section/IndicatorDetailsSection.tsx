import Link from "next/link"
import IndicatorDataSection from "@/containers/indicator-data/components/indicator-data-section/IndicatorDataSection"
import { IndicatorDetailsSectionProps } from "@/containers/indicator-details-section/types"
import IndicatorOptionsButton from "@/components/indicator-options-button/IndicatorOptionsButton"
import translate from "@/modules/i18n"
import "@/containers/indicator-details-section/styles.scss"

const IndicatorDetailsSection = ({
  indicator,
  country,
}: IndicatorDetailsSectionProps) => {
  const title = country
    ? `${country.name} - ${indicator.label}`
    : indicator.label

  const descriptionElement = indicator.description && (
    <p
      data-testid="indicator-description"
      className="indicator-page__description"
      dangerouslySetInnerHTML={{ __html: indicator.description }}
    />
  )

  const backButton = country && (
    <p className="indicator-page__back">
      <Link href={`/indicator/${indicator.id}`}>
        {translate("pages.indicator.back_to_all")}
      </Link>
    </p>
  )

  return (
    <IndicatorDataSection data-testid="indicator-data-section">
      <IndicatorOptionsButton
        indicatorId={indicator.id}
        countryId={country?.id}
      />
      <h1 className="indicator-page__title" data-testid="indicator-title">
        {title}
      </h1>
      <p className="indicator-page__source">
        {translate("pages.indicator.source", { value: indicator.source })}
      </p>
      <p className="indicator-page__unit">
        {translate("pages.indicator.unit", { value: indicator.unit })}
      </p>
      {descriptionElement}
      {backButton}
    </IndicatorDataSection>
  )
}

export default IndicatorDetailsSection
