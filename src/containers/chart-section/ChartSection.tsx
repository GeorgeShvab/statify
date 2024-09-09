"use client"

import { CountryWithValues } from "@/types/types"
import { FC } from "react"
import Chart from "../chart/chart/Chart"
import { Indicator } from "@prisma/client"

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
