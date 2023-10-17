import { Indicator, RowItem } from '@/types'
import prettifyValue from '@/utils/prettifyValue'
import Link from 'next/link'
import { FC, memo } from 'react'

interface Props {
  indicator: Indicator
  country: RowItem
}

const Row: FC<Props> = ({ indicator, country }) => {
  return (
    <tr className="country-row group">
      <td className="relative border-b text-[10px] md:text-base py-4 md:py-3 pl-4 px-2 md:px-3 md:pr-6 md:pl-6 text-gray-400 font-normal text-left w-24 md:w-[350px]">
        <Link href={`/indicator/${indicator.id}/${country.id}`} className="hover:text-neutral-600 transition-colors">
          {country.name}
        </Link>
      </td>
      <td className="border-b py-4 md:py-3 px-2 md:px-3 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal text-right w-32 md:w-64">
        {prettifyValue(country.value)}
      </td>
      <td className="border-b text-[10px] md:text-base text-gray-400 font-normal text-right w-[100px] md:w-48">
        <div className="w-full flex justify-center">
          <img
            alt="Trend"
            src={`${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/${indicator.id}/${country.id}.png`}
            className="w-[60px] md:w-auto"
          />
        </div>
      </td>
      <td className="border-b py-4 md:py-3 px-2 md:px-3 pr-4 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal text-right w-[5px] md:w-[75px]">
        {country.year}
      </td>
    </tr>
  )
}

export default memo(Row)
