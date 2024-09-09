import useDebounce from "@/hooks/use-debounce/useDebounce"
import { ChangeEvent, ComponentProps, FC, useEffect, useState } from "react"

interface Props extends Omit<ComponentProps<"div">, "onChange"> {
  color?: string
  onChange: (color: string) => void
}

const ColorInput: FC<Props> = ({ color, onChange, className, ...props }) => {
  const [value, setValue] = useState(color || "")

  useEffect(() => {
    if (color && color.replace("#", "") !== value.replace("#", "")) {
      setValue(color.at(0) === "#" ? color.slice(1, color.length) : color) // I could use key in parent component, but this way focus is not lost
    }
  }, [color])

  const updateChartColor = useDebounce((value: string) => {
    onChange(value)
  }, 500)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()

    if (value.length > 7) return

    setValue(value)
    if (/^(?:#?[0-9a-fA-F]{3}){1,2}$/.test(value)) {
      updateChartColor(value.at(0) === "#" ? value : "#" + value)
    }
  }

  return (
    <div
      className={`flex-1 bg-white border rounded-lg overflow-hidden flex${
        className ? " " + className : ""
      }`}
      {...props}
    >
      <div className="h-10 w-10 flex-0 bg-neutral-50 flex justify-center items-center text-neutral-800">
        #
      </div>
      <input
        type="text"
        className="h-10 w-24 outline-none text-sm text-neutral-800 bg-white px-3.5 lowercase"
        value={value}
        onInput={handleInput}
      />
    </div>
  )
}

export default ColorInput
