import { useRef } from 'react'

const chartColors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
  '#1f11b4',
  '#ff1a0e',
  '#01a02c',
  '#002728',
  '#946711',
]

const useColors = () => {
  const colors = useRef<string[]>(chartColors)

  const getColor = () => {
    const color = colors.current[0]

    colors.current = colors.current.filter((item) => item !== color)

    return color
  }

  const resetColors = () => {
    colors.current = chartColors
  }

  const addColor = (color: string) => {
    colors.current.push(color)
  }

  return { colors, addColor, getColor, resetColors }
}

export default useColors
