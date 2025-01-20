import { FC } from "react"
import Link from "next/link"
import { IndicatorCardProps } from "@/components/indicator-card/types"
import truncateString from "@/utils/truncate/truncate"
import translate from "@/modules/i18n"
import "@/components/indicator-card/styles.scss"

const IndicatorCard: FC<IndicatorCardProps> = ({
  label,
  id,
  description,
  source,
  countryId,
  countryName,
}) => {
  const link = `/indicator/${id}${countryId ? "/" + countryId : ""}`
  const title = (countryId && countryName ? countryName + " - " : "") + label

  return (
    <Link href={link} className="indicator-card" data-testid="indicator-card">
      <div>
        <h2 className="indicator-card__title">{title}</h2>
        {source && (
          <p className="indicator-card__source">
            {translate("pages.indicator.source", { value: source })}
          </p>
        )}
      </div>
      {description && description.trim() && (
        <p className="indicator-card__description">
          {truncateString(description, 30)}
        </p>
      )}
    </Link>
  )
}

export default IndicatorCard
