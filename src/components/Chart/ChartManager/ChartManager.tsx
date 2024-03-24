import { ChangeEvent, FC, useDeferredValue, useState } from 'react'
import useChart from '../ChartContext'
import SearchInput from '@/ui/SearchInput/SearchInput'
import ChartManagerSectionButtons from './ChartManagerSectionButtons'
import ChartManagerAllSection from './ChartManagerAllSection'
import ChartManagerSelectedSection from './ChartManagerSelectedSection'

export type Section = 'all' | 'selected'

const ChartManager: FC = () => {
  const { regions, update } = useChart()

  const [value, setValue] = useState<string>('')
  const [section, setSection] = useState<Section>('all')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  const clearValue = () => setValue('')

  const defferedValue = useDeferredValue(value.trim())

  const handleRegionClick = (data: { isSelected: boolean; id: string; name: string }) => {
    if (data.isSelected) {
      update({ id: data.id, isSelected: false })
    } else {
      update({ id: data.id, isSelected: true })
    }
  }

  const handleChangeColor = (id: string, color: string) => update({ id, color })

  return (
    <div>
      <div className="border rounded-lg bg-white h-[72vh] md:h-[65vh] w-[95vw] md:w-[400px] min-h-[300px] flex flex-col">
        <h3 className="text-center font-medium pt-5 mb-4">Edit chart</h3>
        <div className="px-3">
          <SearchInput onChange={handleInput} value={value} onClear={clearValue} />
        </div>
        <ChartManagerSectionButtons section={section} setSection={setSection} />
        {section === 'all' ? (
          <ChartManagerAllSection
            regions={regions}
            onClick={handleRegionClick}
            setColor={handleChangeColor}
            query={defferedValue}
          />
        ) : (
          <ChartManagerSelectedSection
            regions={regions}
            onClick={handleRegionClick}
            setColor={handleChangeColor}
            query={defferedValue}
          />
        )}
      </div>
    </div>
  )
}

export default ChartManager
