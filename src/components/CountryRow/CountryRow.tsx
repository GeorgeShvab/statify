'use client'

import { Value } from '@/types'
import getFullCountryName from '@/utils/getFullCountryName'
import { FC, useState } from 'react'

interface Props {
  country: string
  values: Value
  unit: string
}

const CountryRow: FC<Props> = ({ country, values, unit }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  return (
    <table className="table-auto w-full relative country-table">
      <thead className="" onClick={() => setIsCollapsed((prev) => !prev)}>
        <tr className="">
          <th className="sticky top-0 !border-b dark:border-slate-600 text-base md:text-lg font-bold py-1 md:py-2 pl-5 md:pl-7 text-neutral-800 dark:text-slate-200 text-left md:w-[350px] bg-neutral-50">
            {getFullCountryName(country)}
          </th>
          <th className="sticky top-0 !border-b dark:border-slate-600 text-sm md:text-base font-medium p-2 md:p-3 pl-5 md:pl-7 text-neutral-500 dark:text-slate-200 text-right w-20 md:w-48 bg-neutral-50">
            Year
          </th>
          <th className="sticky top-0 !border-b dark:border-slate-600 text-sm md:text-base font-medium p-2 md:p-3 pl-5 pr-6 md:pr-7 text-neutral-500 dark:text-slate-200 text-right bg-neutral-50 w-32">
            {unit}
          </th>
        </tr>
      </thead>
      {!isCollapsed && (
        <tbody>
          {Object.keys(values).map((item) => (
            <tr>
              <th className="border-b dark:border-slate-600 p-3 md:p-3 pl-5 md:pl-7 text-gray-400 font-normal dark:text-slate-200 text-left md:w-[350px]"></th>
              <th className="border-b dark:border-slate-600 p-3 md:p-3 text-sm md:text-base text-gray-400 font-normal dark:text-slate-200 text-right md:w-48">
                {item}
              </th>
              <th className="border-b dark:border-slate-600 p-3 md:p-3 pr-5 md:pr-7 text-sm md:text-base text-gray-400 font-normal dark:text-slate-200 text-right w-32">
                {values[item].toFixed(2) || <span className="mr-2.5">-</span>}
              </th>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  )
}

/*<tr>
        <td className="border-b border-slate-100 dark:border-slate-700 p-3 pl-5 md:pl-7 text-slate-500 dark:text-slate-400 font-bold w-full">
          {getFullCountryName(country)}
        </td>
      </tr>
      {Object.keys(values).map((item) => (
        <tr>
          <th className="border-b rounded-lg dark:border-slate-600 font-medium p-3 pl-5 md:pl-7 pb-3 text-slate-400 dark:text-slate-200 text-left"></th>
          <th className="border-b border-r dark:border-slate-600 font-medium p-3 pb-3 text-slate-400 dark:text-slate-200 text-right w-72">
            {item}
          </th>
          <th className="border-b rounded-tr-lg dark:border-slate-600 font-medium p-3 pr-5 md:pr-7 pb-3 text-slate-400 dark:text-slate-200 text-right w-40">
            {values[item].toFixed(2) || <span className="mr-2.5">-</span>}
          </th>
        </tr>
      ))} */

export default CountryRow
