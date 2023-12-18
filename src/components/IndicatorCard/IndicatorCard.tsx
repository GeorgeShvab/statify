import truncateString from '@/utils/truncateString'
import { Indicator } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'

const IndicatorCard: FC<Indicator> = ({ label, id, description, source }) => {
  return (
    <Link
      href={`/indicator/${id}`}
      className="px-5 py-4 rounded-lg border bg-white flex flex-col justify-between gap-5 hover:shadow transition-all"
    >
      <div className="">
        <h2 className="font-bold text-lg">{label}</h2>
        {source && <p className="mt-1 text-sm text-neutral-400">Source: {source}</p>}
      </div>
      {description && description.trim() && (
        <p className="text-neutral-500 text-sm">{truncateString(description, 30)}</p>
      )}
    </Link>
  )
}

export default IndicatorCard
