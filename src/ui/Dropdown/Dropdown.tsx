import { FC, MouseEvent, ReactElement, cloneElement, useRef, useState } from 'react'
import Button from '../Button/Button'
import useOutsideClick from '@/hooks/useOutsideClick'

interface Props {
  selected: string
  data: string[]
  onSelect: (topic: string) => void
  children: ReactElement
}

const Dropdown: FC<Props> = ({ selected, data, onSelect, children }) => {
  const containerEl = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClick = (e: MouseEvent) => {
    if (children.props.onClick) children.props.onClick(e)
    setIsOpen((prev) => !prev)
  }

  const close = () => setIsOpen(false)

  const handleSelect = (id: string) => {
    onSelect(id)
    setIsOpen(false)
  }

  useOutsideClick(close, containerEl)

  return (
    <div className="relative" ref={containerEl}>
      {cloneElement(children, { ...children.props, onClick: handleClick }, children.props.children)}
      {isOpen && (
        <div className="overflow-hidden absolute top-full right-0 min-w-full rounded-lg border bg-white">
          <ul className="max-h-[300px] overflow-auto pretty-scrollbar">
            {data.map((item) => (
              <li
                role="button"
                className={`text-sm h-9 px-4 py-2 whitespace-nowrap flex items-center hover:bg-neutral-100 ${
                  selected === item ? 'bg-neutral-100' : ''
                }`}
                onClick={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
