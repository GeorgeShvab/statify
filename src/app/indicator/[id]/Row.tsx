import LineChart from '@/components/LineChart/LineChart'
import { Country, Indicator, Value } from '@/types'
import prettifyValue from '@/utils/prettifyValue'
import Link from 'next/link'
import { FC, MouseEvent, memo } from 'react'

interface Props {
  indicator: Indicator
  country: Country & { values: Value[] }
  onAddToChart: (data: Country & { values: Value[] }) => void
  onRemoveFromChart: (id: string) => void
  isAtChart: boolean
}

const Row: FC<Props> = ({ indicator, country, onAddToChart, isAtChart }) => {
  const handleAdd = () => {
    onAddToChart(country)
  }

  const handleContextMenu = (e: MouseEvent) => {
    if (window.screen.width < 1024) {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <tr className="country-row group select-none" onContextMenu={handleContextMenu} role="button">
      <td
        className={`relative border-b text-[10px] md:text-base py-4 md:py-3 pl-4 px-2 md:px-3 md:pr-6 md:pl-6 text-gray-400 font-normal text-left w-24 md:w-[350px] ${
          isAtChart ? 'bg-neutral-50' : ''
        }`}
      >
        <button
          className="hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity absolute left-[-45px] top-1/2 translate-y-[-50%] w-10 h-10 border rounded-lg bg-white flex items-center justify-center"
          onClick={handleAdd}
          aria-label={isAtChart ? 'Remove from the chart' : 'Add to the chart'}
        >
          {isAtChart ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          )}
        </button>
        <Link
          href={`/indicator/${indicator.id}/${country.id}`}
          className="hover:text-neutral-600 transition-colors select-auto"
        >
          {country.name}
        </Link>
      </td>
      <td
        className={`border-b py-4 md:py-3 px-2 md:px-3 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal select-auto text-right w-32 md:w-64 ${
          isAtChart ? 'bg-neutral-50' : ''
        }`}
      >
        {prettifyValue(country.values[country.values.length - 1].value.toFixed(2))}
      </td>
      <td
        className={`border-b text-[10px] md:text-base text-gray-400 font-normal text-right w-[100px] md:w-48 ${
          isAtChart ? 'bg-neutral-50' : ''
        }`}
      >
        <div className="w-full flex justify-center">
          <LineChart
            data={
              country.values
                .filter((item, index) => index % 2 === 0 || index === 0)
                .map((item) => item.value) as number[]
            }
          />
        </div>
      </td>
      <td
        className={`border-b py-4 md:py-3 px-2 md:px-3 select-auto pr-4 md:pr-6 md:pl-6 text-[10px] md:text-base text-gray-400 font-normal text-right w-[5px] md:w-[75px] ${
          isAtChart ? 'bg-neutral-50' : ''
        }`}
      >
        {country.values[country.values.length - 1].year}
      </td>
    </tr>
  )
}

export default memo(Row)
