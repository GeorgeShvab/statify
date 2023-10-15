import useChart from '@/components/Chart/ChartContext'
import { Country, Value, Indicator } from '@/types'
import { FC, useCallback } from 'react'
import Row from './Row'

interface Props {
  data: (Country & { values: Value[] })[]
  indicator: Indicator
}

const Rows: FC<Props> = (props) => {
  return (
    <>
      {props.data.map(
        (item) => !!item.values.length && <Row key={item.id} indicator={props.indicator} country={item} />
      )}
    </>
  )
}

export default Rows
