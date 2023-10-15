import { ChangeEvent, FC, useMemo, useState } from 'react'
import useChart from '../ChartContext'
import ManageRegionsList from './ManageRegionsList'
import SearchInput from '@/ui/SearchInput/SearchInput'

const ManageRegions: FC = () => {
  const { add, regions } = useChart()

  const [value, setValue] = useState<string>('')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    setValue(query)
  }

  const clearValue = () => setValue('')

  const data = useMemo(
    () =>
      value.trim()
        ? regions.filter((item) => new RegExp(`(^|\\s)${value.trim()}`, 'gi').test(item.name.trim()))
        : regions,
    [value, regions]
  )

  return (
    <div className="border rounded-lg bg-white h-[75vh] md:h-[60vh] w-[95vw] md:w-[400px] min-h-[300px] flex flex-col overflow-hidden">
      <h3 className="text-center font-medium pt-5 mb-4">Chart manager</h3>
      <div className="px-3 mb-3">
        <SearchInput onChange={handleInput} value={value} onClear={clearValue} />
      </div>

      <ManageRegionsList regions={data} onClick={add} />
    </div>
  )
}

export default ManageRegions
