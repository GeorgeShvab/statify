"use client"

import { ChangeEvent, FC, useDeferredValue, useRef, useState } from "react"
import "@/ui/select/styles.scss"
import dynamic from "next/dynamic"
import AbsolutePosition from "@/components/absolute-position/AbsolutePosition"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"
import cn from "@/utils/cn/cn"
import UpChevronIcon from "@/ui/icons/UpChevronIcon"
import DownChevronIcon from "@/ui/icons/DownChevronIcon"
import SelectItem from "@/ui/select/components/select-item/SelectItem"
import Input from "../input/Input"
import "./styles.scss"
import { SelectWithSearchProps } from "./SelectWithSearch.types"

const Portal = dynamic(() => import("@/components/Portal"), { ssr: false })

const SelectWithSearch: FC<SelectWithSearchProps> = ({
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
  const selectEl = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const [searchValue, setSearchValue] = useState("")

  const deferredSearchValue = useDeferredValue(searchValue)

  const toggle = () => setIsOpen((prev) => !prev)
  const onClose = () => setIsOpen(false)

  const selectedOption = options.find((item) => item.value === value)!

  const mainLabel = renderSelectedLabel
    ? renderSelectedLabel(selectedOption)
    : selectedOption.label

  const chevronIcon = isOpen ? <UpChevronIcon /> : <DownChevronIcon />

  const filteredOptions = deferredSearchValue.trim()
    ? options.filter((item) =>
        new RegExp("^" + deferredSearchValue, "i").test(item.label)
      )
    : options

  const selectItems = filteredOptions.map((item) => {
    const label = renderItemLabel ? renderItemLabel(item) : item.label
    const isSelected = item.value === selectedOption.value

    const handleItemClick = () => {
      onChange(item)
      onClose()
    }

    return (
      <SelectItem
        key={item.value}
        isSelected={isSelected}
        size={size}
        onClick={handleItemClick}
      >
        {label}
      </SelectItem>
    )
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const content = selectItems.length ? (
    <ul className="select__options">{selectItems}</ul>
  ) : (
    <p className="select__message">No matches found</p>
  )

  return (
    <>
      <div
        className={cn("select", "light", size, className)}
        ref={selectEl}
        onClick={toggle}
        {...props}
      >
        <span role="button">{mainLabel}</span>
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
              <div
                style={{
                  width: selectEl.current?.clientWidth + "px",
                }}
                {...containerProps}
                className={cn(
                  "select__container select-with-search",
                  "light",
                  containerProps?.className
                )}
              >
                <div className="select__input-container">
                  <Input
                    className="select__input"
                    onChange={handleInput}
                    value={searchValue}
                  />
                </div>
                {content}
              </div>
            </AbsolutePosition>
          </DetectOutsideClick>
        </Portal>
      )}
    </>
  )
}

export default SelectWithSearch
