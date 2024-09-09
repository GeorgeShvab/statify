import { ChartItem } from "@/types/types"
import MinusIcon from "@/ui/Icons/MinusIcon"
import PlusIcon from "@/ui/Icons/PlusIcon"
import { FC, memo, useRef, useState } from "react"
import ColorPickerPopover from "@/containers/chart-management-modal/color-picker-popover/ColorPickerPopover"
import Popover from "@/ui/Popover/Popover"

interface Props
  extends Pick<ChartItem, "id" | "name" | "isSelected" | "color"> {
  onClick: (
    data: Pick<ChartItem, "id" | "name" | "isSelected" | "color">
  ) => void
  setColor: (id: string, color: string) => void
}

const ChartManagerListItem: FC<Props> = ({ onClick, setColor, ...props }) => {
  const pickColorButton = useRef<HTMLButtonElement>(null)

  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false)

  const handleCloseColorPicker = () => setIsColorPickerOpen(false)

  const handleClick = () => {
    onClick(props)
  }

  const handleSetColor = (color: string) => setColor(props.id, color)

  return (
    <>
      <li
        className={`px-6 pr-3 gap-0.5 text-sm flex items-center justify-between transition-colors ${
          props.isSelected ? "bg-neutral-100" : "md:hover:bg-neutral-50"
        }`}
      >
        <span className="text-neutral-700">{props.name}</span>
        <button
          className="text-neutral-500 h-10 w-10 flex justify-center items-center bg-red ml-auto"
          aria-label="Select color"
          onClick={() => setIsColorPickerOpen((prev) => !prev)}
          ref={pickColorButton}
        >
          <div
            className="rounded border h-5 w-5"
            style={{ backgroundColor: props.color || undefined }}
          ></div>
        </button>
        <button
          className="text-neutral-500 h-10 w-10 flex justify-center items-center hover:text-neutral-700 transition-colors"
          aria-label={props.isSelected ? "Unselect" : "Select"}
          onClick={handleClick}
        >
          {props.isSelected ? (
            <MinusIcon className="w-5 h-5" />
          ) : (
            <PlusIcon className="w-5 h-5" />
          )}
        </button>
      </li>

      <Popover
        position={{ default: "top-center", 769: "top-left" }}
        anchor={pickColorButton}
        isOpen={isColorPickerOpen}
        onClose={handleCloseColorPicker}
        closeOnScroll
      >
        <ColorPickerPopover
          defaultColor={props.color}
          setColor={handleSetColor}
        />
      </Popover>
    </>
  )
}

export default memo(ChartManagerListItem)
