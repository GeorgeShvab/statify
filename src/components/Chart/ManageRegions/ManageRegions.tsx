import { ChangeEvent, FC, useDeferredValue, useMemo, useState } from 'react'
import useChart from '../ChartContext'
import ManageRegionsList from './ManageRegionsList'
import SearchInput from '@/ui/SearchInput/SearchInput'

const ManageRegions: FC = () => {
  const { add, regions, remove } = useChart()

  const [value, setValue] = useState<string>('')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    setValue(query)
  }

  const clearValue = () => setValue('')

  const defferedValue = useDeferredValue(value)

  const data = useMemo(
    () =>
      defferedValue.trim()
        ? regions.filter((item) => new RegExp(`(^|\\s)${defferedValue.trim()}`, 'gi').test(item.name.trim()))
        : regions,
    [defferedValue, regions]
  )

  const handleRegionClick = (data: { isSelected: boolean; id: string; name: string }) => {
    if (data.isSelected) {
      remove(data.id)
    } else {
      add(data.id)
    }
  }

  return (
    <div className="border rounded-lg bg-white h-[75vh] md:h-[60vh] w-[95vw] md:w-[400px] min-h-[300px] flex flex-col overflow-hidden">
      <h3 className="text-center font-medium pt-5 mb-4">Edit chart</h3>
      <div className="px-3 mb-3">
        <SearchInput onChange={handleInput} value={value} onClear={clearValue} />
      </div>

      <ManageRegionsList regions={data} onClick={handleRegionClick} />
    </div>
  )
}

export default ManageRegions
