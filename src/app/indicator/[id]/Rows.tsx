import useChart from '@/components/Chart/ChartContext'
import { Country, Value, Indicator, RowCountry } from '@/types'
import { FC, useCallback } from 'react'
import Row from './Row'

interface Props {
  data: RowCountry[]
  indicator: Indicator
}

const Rows: FC<Props> = (props) => {
  return (
    <>
      {props.data.map((item) => (
        <Row key={item.id} indicator={props.indicator} country={item} />
      ))}
    </>
  )
}

export default Rows
