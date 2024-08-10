import { CSSProperties, FC, memo } from 'react'
import { Value } from '@/types'
import prettifyValue from '@/utils/prettifyValue'

export interface CountryRowProps {
  value: Value
  precition: number
  style: CSSProperties
}

const Row: FC<CountryRowProps> = ({ value, precition, style }) => {
  return (
    <tr className='country-row' key={value.year} style={style}>
      <td className='border-b py-3 pl-4 pr-3 md:pr-6 md:pl-6 text-xs md:text-base text-gray-400 font-normal text-left w-full'>
        {prettifyValue(value.value, precition)}
      </td>
      <td className='border-b py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-xs md:text-base text-gray-400 font-normal text-right w-fit md:w-32'>
        {value.year}
      </td>
    </tr>
  )
}

export default memo(Row)
