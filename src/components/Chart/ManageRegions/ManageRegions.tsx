import { ChangeEvent, FC, useDeferredValue, useMemo, useState } from 'react'
import useChart from '../ChartContext'
import ManageRegionsList from './ManageRegionsList'
import SearchInput from '@/ui/SearchInput/SearchInput'
import SectionButtons from './SectionButtons'

export type Section = 'all' | 'selected'

const ManageRegions: FC = () => {
  const { add, regions, remove } = useChart()

  const [value, setValue] = useState<string>('')
  const [section, setSection] = useState<Section>('all')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    setValue(query)
  }

  const clearValue = () => setValue('')

  const defferedValue = useDeferredValue(value.trim())

  const data = useMemo(() => {
    if (section === 'all') {
      return defferedValue
        ? regions.filter((item) => new RegExp(`(^|\\s)${defferedValue}`, 'gi').test(item.name.trim()))
        : regions
    } else {
      return defferedValue
        ? regions.filter(
            (item) => new RegExp(`(^|\\s)${defferedValue}`, 'gi').test(item.name.trim()) && item.isSelected
          )
        : regions.filter((item) => item.isSelected)
    }
  }, [defferedValue, regions, section])

  const handleRegionClick = (data: { isSelected: boolean; id: string; name: string }) => {
    if (data.isSelected) {
      remove(data.id)
    } else {
      add(data.id)
    }
  }

  return (
    <div>
      <div className="border rounded-lg bg-white h-[72vh] md:h-[65vh] w-[95vw] md:w-[400px] min-h-[300px] flex flex-col">
        <h3 className="text-center font-medium pt-5 mb-4">Edit chart</h3>
        <div className="px-3">
          <SearchInput onChange={handleInput} value={value} onClear={clearValue} />
        </div>
        <SectionButtons section={section} setSection={setSection} />
        {section === 'all' ? (
          <ManageRegionsList regions={data} onClick={handleRegionClick} />
        ) : (
          <ManageRegionsList regions={data} onClick={handleRegionClick} />
        )}
      </div>
    </div>
  )
}

export default ManageRegions
