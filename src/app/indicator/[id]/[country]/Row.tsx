import { FC, memo } from 'react'
import { Value } from '@/types'
import prettifyValue from '@/utils/prettifyValue'
import TableCell from '@/ui/TableCell/TableCell'

interface Props {
  value: Value
  precition: number
}

const Row: FC<Props> = memo(({ value, precition }) => {
  return (
    <tr className='country-row' key={value.year}>
      <TableCell className='pl-4 pr-3 md:pr-6 md:pl-6'>
        {prettifyValue(value.value, precition)}
      </TableCell>
      <TableCell className='pl-4 pr-3 md:pr-6 md:pl-6 text-right w-fit md:w-32'>
        {value.year}
      </TableCell>
    </tr>
  )
})

Row.displayName = 'CountryYearRow'

export default Row
