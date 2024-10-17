"use client"

import { FC } from "react"
import { Indicator } from "@prisma/client"
import Chart from "@/containers/chart/chart/Chart"
import { CountryWithValues } from "@/types/country.types"

interface ChartSectionProps {
  data: CountryWithValues[]
  indicator: Indicator
}

const ChartSection: FC<ChartSectionProps> = ({ data, indicator }) => {
  return (
    <section>
      <Chart indicator={indicator} data={data} />
    </section>
  )
}

export default ChartSection
