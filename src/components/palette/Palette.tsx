import colorPickerPalette from "@/constants/colorPickerPalette"
import ColorSample from "@/ui/color-sample/ColorSample"
import { FC } from "react"

interface Props {
  onChange: (color: string) => void
  color?: string
}

const Palette: FC<Props> = ({ color, onChange }) => {
  return (
    <div className="grid grid-cols-5 gap-1 md:gap-1.5 grid-rows-5 grid-flow-col">
      {colorPickerPalette.map((item) => (
        <ColorSample
          key={item}
          color={item}
          onClick={() => onChange(item)}
          style={{
            backgroundColor: item,
            outlineOffset: "2px",
            outline: item === color ? "1px solid #bbbbbb" : undefined,
          }}
          className="h-7 md:h-8 w-7 md:w-8"
          element="button"
        />
      ))}
    </div>
  )
}

export default Palette
