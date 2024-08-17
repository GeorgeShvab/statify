import { ChangeEvent, FC, useDeferredValue, useState } from 'react'
import SearchInput from '@/ui/SearchInput/SearchInput'
import ChartManagerSectionButtons from '@/containers/ChartManagementModal/ChartManager/ChartManagerSectionButtons'
import ChartManagerAllSection from '@/containers/ChartManagementModal/ChartManager/ChartManagerAllSection'
import ChartManagerSelectedSection from '@/containers/ChartManagementModal/ChartManager/ChartManagerSelectedSection'
import { useChart } from '@/containers/Chart/ChartProvider/ChartProvider'

export type Section = 'all' | 'selected'

const ChartManager: FC = () => {
  const {
    data,
    setColor,
    selectRegion,
    unselectRegion,
    toggleRegionSelection
  } = useChart()

  const [value, setValue] = useState<string>('')
  const [section, setSection] = useState<Section>('all')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const clearValue = () => setValue('')

  const defferedValue = useDeferredValue(value.trim())

  const handleChangeColor = (id: string, color: string) => setColor(id, color)

  return (
    <div>
      <div className='border rounded-lg bg-white h-[72vh] md:h-[65vh] w-[95vw] md:w-[400px] min-h-[300px] flex flex-col'>
        <h3 className='text-center font-medium pt-5 mb-4'>Edit chart</h3>
        <div className='px-3'>
          <SearchInput
            onChange={handleInput}
            value={value}
            onClear={clearValue}
          />
        </div>
        <ChartManagerSectionButtons section={section} setSection={setSection} />
        {section === 'all' ? (
          <ChartManagerAllSection regions={data} query={defferedValue} />
        ) : (
          <ChartManagerSelectedSection regions={data} query={defferedValue} />
        )}
      </div>
    </div>
  )
}

export default ChartManager
