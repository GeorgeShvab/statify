import { FC, PropsWithChildren } from "react"
import "@/containers/indicator-data/components/indicator-data-section/styles.scss"

const IndicatorDataSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="indicator-data-section container">
      <div className="indicator-data-section__container">{children}</div>
    </section>
  )
}

export default IndicatorDataSection
