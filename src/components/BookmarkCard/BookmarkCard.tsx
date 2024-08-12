import { Country, Indicator } from '@prisma/client'
import truncateString from '@/utils/truncateString'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  indicator: Indicator
  country: Country | null
}

const BookmarkCard: FC<Props> = ({ indicator, country }) => {
  return (
    <Link
      href={`/indicator/${indicator.id}${country ? '/' + country.id : ''}`}
      className='px-5 py-4 rounded-lg border bg-white flex flex-col justify-between gap-5 hover:shadow transition-all'
    >
      <div>
        <h2 className='font-bold text-lg'>
          {country ? country?.name + ' - ' : ''}
          {indicator.label}
        </h2>
        {indicator.source && (
          <p className='mt-1 text-sm text-neutral-400'>
            Source: {indicator.source}
          </p>
        )}
      </div>
      {indicator.description && (
        <p className='text-neutral-500 text-sm'>
          {truncateString(indicator.description, 30)}
        </p>
      )}
    </Link>
  )
}

export default BookmarkCard
