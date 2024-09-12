import { FC, useState } from "react"
import "@/containers/chart-management-modal/chart-manager/style.css"
import IconButton from "@/ui/icon-button/IconButton"
import SquaresIcon from "@/ui/icons/Squares"
import BrushIcon from "@/ui/icons/Brush"
import Palette from "@/components/palette/Palette"
import ColorPicker from "@/components/color-picker/ColorPicker"
import ColorInput from "@/components/color-input/ColorInput"
import { ColorPickerPopoverProps } from "@/containers/chart-management-modal/color-picker-popover/ColorPickerPopover.types"

const ColorPickerPopover: FC<ColorPickerPopoverProps> = ({
  defaultColor,
  setColor,
}) => {
  const [section, setSection] = useState<"palette" | "picker">("palette")

  return (
    <div>
      <div className="mb-1 md:mb-1.5 flex gap-1 md:gap-1.5">
        <IconButton
          className={`shadow ${
            section === "palette"
              ? "!bg-white"
              : "!text-neutral-400 !bg-neutral-50"
          }`}
          color="light"
          onClick={() => setSection("palette")}
        >
          <SquaresIcon className="w-[22px] h-[22px]" />
        </IconButton>
        <IconButton
          className={`shadow ${
            section === "picker"
              ? "!bg-white"
              : "!text-neutral-400 !bg-neutral-50"
          }`}
          color="light"
          onClick={() => setSection("picker")}
        >
          <BrushIcon className="w-5 h-5" />
        </IconButton>
        <ColorInput
          className="shadow"
          color={defaultColor}
          onChange={setColor}
        />
      </div>
      <div className="rounded-lg p-2 border bg-white shadow">
        {section === "picker" ? (
          <ColorPicker color={defaultColor} onChange={setColor} />
        ) : (
          <Palette color={defaultColor} onChange={setColor} />
        )}
      </div>
    </div>
  )
}

export default ColorPickerPopover
