import useDebounce from '@/hooks/useDebounce'
import { FC, useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
  color?: string
  onChange: (color: string) => void
}

const ColorPicker: FC<Props> = ({ color, onChange }) => {
  const [value, setValue] = useState<string | undefined>(color)

  const debouncedOnChange = useDebounce((value: string) => {
    onChange(value)
  }, 150)

  const handleChange = (color: string) => {
    setValue(color)
    if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) debouncedOnChange(color)
  }

  useEffect(() => {
    if (color !== value) setValue(color)
  }, [color])

  return <HexColorPicker onChange={handleChange} color={value} />
}

export default ColorPicker
