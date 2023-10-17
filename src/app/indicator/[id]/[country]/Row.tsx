import { FC, memo } from 'react'
import { Value } from '@/types'
import prettifyValue from '@/utils/prettifyValue'

interface Props {
  value: Value
}

const Row: FC<Props> = memo(({ value }) => {
  return (
    <tr className="country-row" key={value.year}>
      <td className="border-b py-3 pl-4 pr-3 md:pr-6 md:pl-6 text-xs md:text-base text-gray-400 font-normal text-left">
        {prettifyValue(value.value)}
      </td>
      <td className="border-b py-3 pl-3 pr-4 md:pr-6 md:pl-6 text-xs md:text-base text-gray-400 font-normal text-right w-fit md:w-32">
        {value.year}
      </td>
    </tr>
  )
})

export default Row
