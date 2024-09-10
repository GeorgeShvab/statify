import { FC } from "react"
import { Section } from "@/containers/chart-management-modal/chart-manager/ChartManager"
import Button from "@/ui/dutton/Button"

interface Props {
  setSection: (section: "all" | "selected") => void
  section: Section
}

const ChartManagerSectionButtons: FC<Props> = ({ section, setSection }) => {
  return (
    <div className="flex top-full py-3 px-3 gap-2 w-full">
      <Button
        className={`text-sm flex-1 ${
          section === "all" ? "!bg-white" : "!text-neutral-400 !bg-neutral-50"
        }`}
        onClick={() => setSection("all")}
        color="white"
      >
        All regions
      </Button>
      <Button
        className={`text-sm flex-1 ${
          section === "selected"
            ? "!bg-white"
            : "!text-neutral-400 !bg-neutral-50"
        }`}
        onClick={() => setSection("selected")}
        color="white"
      >
        Selected regions
      </Button>
    </div>
  )
}

export default ChartManagerSectionButtons
