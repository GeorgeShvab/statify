import { CountryRowValue } from '@/types'
import TableCell from '@/ui/TableCell/TableCell'
import prettifyValue from '@/utils/prettifyValue'
import { Indicator } from '@prisma/client'
import Link from 'next/link'
import { FC, memo } from 'react'

interface Props {
  indicator: Indicator
  country: CountryRowValue
}

const Row: FC<Props> = ({ indicator, country }) => {
  return (
    <tr className='country-row group'>
      <TableCell className='pl-4 w-24 md:w-[350px]'>
        <Link
          href={`/indicator/${indicator.id}/${country.id}`}
          className='hover:text-neutral-600 transition-colors'
        >
          {country.name}
        </Link>
      </TableCell>
      <TableCell className='text-right w-32 md:w-64'>
        {prettifyValue(country.value, indicator.precision)}
      </TableCell>
      <TableCell className='text-right w-[100px] md:w-48 !p-0'>
        <div className='w-full flex justify-center'>
          <img
            alt='Trend'
            src={`${process.env.NEXT_PUBLIC_IMAGES_HOSTING_ADDRESS}/row-charts/${indicator.id}/${country.id}.png`}
            className='w-[60px] md:w-auto'
          />
        </div>
      </TableCell>
      <TableCell className='pr-4 text-right w-[5px] md:w-[75px]'>
        {country.year}
      </TableCell>
    </tr>
  )
}

Row.displayName = 'CountryRow'

export default memo(Row)
