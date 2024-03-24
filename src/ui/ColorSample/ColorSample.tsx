import { createElement, FC } from 'react'

export interface ColorSampleProps extends React.HTMLAttributes<HTMLElement> {
  color: string
  className?: string
  element?: keyof JSX.IntrinsicElements
}

const ColorSample: FC<ColorSampleProps> = ({ color, className = '', element = 'div', ...props }) => {
  return createElement(element, {
    ...props,
    className: `rounded ${className ? className : 'w-5 h-5'}`,
    style: { backgroundColor: color, ...props.style },
  })
}

export default ColorSample
