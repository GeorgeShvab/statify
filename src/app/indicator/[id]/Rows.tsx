import useChart from '@/components/Chart/ChartContext'
import { Country, Value, Indicator } from '@/types'
import { FC, useCallback } from 'react'
import Row from './Row'

interface Props {
  data: (Country & { values: Value[] })[]
  indicator: Indicator
}

const Rows: FC<Props> = (props) => {
  const chart = useChart()

  const add = useCallback(chart.add, [])
  const remove = useCallback(chart.remove, [])

  const chartIds = chart.data.map((item) => item.id)

  return (
    <>
      {props.data.map(
        (item) =>
          !!item.values.length && (
            <Row
              key={item.id}
              indicator={props.indicator}
              country={item}
              onAddToChart={add}
              onRemoveFromChart={remove}
              isAtChart={chartIds.includes(item.id)}
            />
          )
      )}
    </>
  )
}

export default Rows
