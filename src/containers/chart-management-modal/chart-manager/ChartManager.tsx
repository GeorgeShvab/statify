import { ChangeEvent, FC, useDeferredValue, useState } from "react"
import ChartManagerAllSection from "@/containers/chart-management-modal/chart-manager/ChartManagerAllSection"
import ChartManagerSectionButtons from "@/containers/chart-management-modal/chart-manager/ChartManagerSectionButtons"
import ChartManagerSelectedSection from "@/containers/chart-management-modal/chart-manager/ChartManagerSelectedSection"
import { useChart } from "@/containers/chart/chart-provider/ChartProvider"
import SearchInput from "@/components/search-input/SearchInput"

export type Section = "all" | "selected"

const ChartManager: FC = () => {
  const { data } = useChart()

  const [value, setValue] = useState<string>("")
  const [section, setSection] = useState<Section>("all")

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const clearValue = () => setValue("")

  const defferedValue = useDeferredValue(value.trim())

  return (
    <div>
      <div className="border rounded-lg bg-white h-[72vh] md:h-[65vh] w-[95vw] md:w-[400px] min-h-[300px] flex flex-col">
        <h3 className="text-center font-medium pt-5 mb-4">Edit chart</h3>
        <div className="px-3">
          <SearchInput
            onChange={handleInput}
            value={value}
            onClear={clearValue}
          />
        </div>
        <ChartManagerSectionButtons section={section} setSection={setSection} />
        {section === "all" ? (
          <ChartManagerAllSection regions={data} query={defferedValue} />
        ) : (
          <ChartManagerSelectedSection regions={data} query={defferedValue} />
        )}
      </div>
    </div>
  )
}

export default ChartManager
