import { CountryRowValue } from '@/types'
import prettifyValue from '@/utils/prettifyValue'
import { Indicator } from '@prisma/client'
import Link from 'next/link'
import { CSSProperties, FC, memo } from 'react'

interface Props {
  indicator: Indicator
  country: CountryRowValue
  style: CSSProperties
}

const Row: FC<Props> = ({ indicator, country, style }) => {
  return (
    <tr className='country-row group' style={style}>
      <td className='relative border-b text-[10px] md:text-base py-4 md:py-3 pl-4 px-2 md:px-3 md:pr-6 md:pl-6 text-gray-400 font-normal text-left w-24 md:w-[50%]'>
        <Link
          href={`/indicator/${indicator.id}/${country.id}`}
          className='hover:text-neutral-600 transition-colors'
        >
          {country.name}
        </Link>
      </td>
      <td className='border-b py-4 md:py-3 px-2 md:px-3 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal text-right w-32 md:w-64'>
        {prettifyValue(country.value, indicator.precision)}
      </td>
      <td className='relative border-b text-[10px] md:text-base text-gray-400 font-normal text-right w-[100px] md:w-48'>
        <img
          alt='Trend'
          src={`${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/row-charts/${indicator.id}/${country.id}.png`}
          className='absolute w-[60px] h-[48px] md:w-auto'
        />
      </td>
      <td className='border-b py-4 md:py-3 px-2 md:px-3 pr-4 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal text-right w-[5px] md:w-[75px]'>
        {country.year}
      </td>
    </tr>
  )
}

export default memo(Row)
