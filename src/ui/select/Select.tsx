"use client"

import { FC, useRef, useState } from "react"
import "@/ui/select/styles.scss"
import dynamic from "next/dynamic"
import AbsolutePosition from "@/components/absolute-position/AbsolutePosition"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"
import cn from "@/utils/cn/cn"
import { SelectProps } from "@/ui/select/Select.types"
import UpChevronIcon from "@/ui/icons/UpChevronIcon"
import DownChevronIcon from "@/ui/icons/DownChevronIcon"

const Portal = dynamic(() => import("@/components/Portal"), { ssr: false })

const Select: FC<SelectProps> = ({
  value,
  options,
  onChange,
  itemProps,
  className,
  containerProps,
  size = "medium",
  renderItemLabel,
  renderSelectedLabel,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectEl = useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen((prev) => !prev)
  const onClose = () => setIsOpen(false)

  const selectedOption = options.find((item) => item.value === value)!

  const mainLabel = renderSelectedLabel
    ? renderSelectedLabel(selectedOption)
    : selectedOption.label

  const chevronIcon = isOpen ? <UpChevronIcon /> : <DownChevronIcon />

  const selectItems = options.map((item) => {
    const label = renderItemLabel ? renderItemLabel(item) : item.label
    const isSelected = item.value === selectedOption.value

    const handleItemClick = () => {
      onChange(item)
      onClose()
    }

    return (
      <li
        key={item.value}
        onClick={handleItemClick}
        {...itemProps}
        className={cn(
          "select__item",
          "light",
          size,
          itemProps?.className,
          isSelected && "selected"
        )}
      >
        {label}
      </li>
    )
  })

  return (
    <>
      <div
        className={cn("select", "light", size, className)}
        ref={selectEl}
        onClick={toggle}
        {...props}
      >
        <div>{mainLabel}</div>
        <div className="select__chevron">{chevronIcon}</div>
      </div>
      {isOpen && (
        <Portal>
          <DetectOutsideClick onOutsideClick={onClose} ignore={selectEl}>
            <AbsolutePosition
              anchor={selectEl}
              dependenciesForRecalculation={[isOpen, value]}
              position="bottom-start"
              offset={5}
            >
              <ul
                style={{
                  width: selectEl.current?.clientWidth + "px",
                }}
                {...containerProps}
                className={cn(
                  "select__container",
                  "light",
                  containerProps?.className
                )}
              >
                {selectItems}
              </ul>
            </AbsolutePosition>
          </DetectOutsideClick>
        </Portal>
      )}
    </>
  )
}

export default Select
