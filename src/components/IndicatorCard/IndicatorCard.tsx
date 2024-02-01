import truncateString from '@/utils/truncateString'
import { Indicator } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'

interface Props extends Pick<Indicator, 'label' | 'id' | 'description' | 'source'> {
  countryId?: string
  countryName?: string
}

const IndicatorCard: FC<Props> = ({ label, id, description, source, countryId, countryName }) => {
  return (
    <Link
      href={`/indicator/${id}${countryId ? '/' + countryId : ''}`}
      className="px-5 py-4 rounded-lg border bg-white flex flex-col justify-between gap-5 hover:shadow transition-all"
    >
      <div className="">
        <h2 className="font-bold text-lg">
          {countryId && countryName ? countryName + ' - ' : ''}
          {label}
        </h2>
        {source && <p className="mt-1 text-sm text-neutral-400">Source: {source}</p>}
      </div>
      {description && description.trim() && (
        <p className="text-neutral-500 text-sm">{truncateString(description, 30)}</p>
      )}
    </Link>
  )
}

export default IndicatorCard
