import {
  ChangeEvent,
  FC,
  memo,
  useDeferredValue,
  useMemo,
  useState,
} from "react"
import ChartManagerModalRegion from "@/containers/modals/chart-manager-modal/components/chart-manager-modal-region/ChartManagerModalRegion"
import { ChartManagerModalProps } from "@/containers/modals/chart-manager-modal/types"
import ModalContainer from "@/components/modal-container/ModalContainer"
import SearchInput from "@/components/search-input/SearchInput"
import { useAlert } from "@/providers/alert-provider/AlertProvider"
import { ChartItem } from "@/store/chart-store/types"
import searchInString from "@/utils/search-in-string/searchInString"
import translate from "@/modules/i18n"
import "@/containers/modals/chart-manager-modal/styles.scss"

const ChartManagerModal: FC<ChartManagerModalProps> = ({
  data,
  selected,
  onAddItem,
  onClose,
  onRemoveItem,
}) => {
  const [value, setValue] = useState<string>("")

  const { openAlert } = useAlert()

  const clearValue = () => setValue("")

  const defferedValue = useDeferredValue(value.trim())

  const selectedIds = new Set(selected.map((item) => item.id))

  const [filteredSelectedItems, filteredAllItems] = useMemo(() => {
    if (!defferedValue) return [selected, data]

    const filteredSelected = selected.filter((item) =>
      searchInString(item.name, defferedValue)
    )
    const filteredAll = data.filter((item) =>
      searchInString(item.name, defferedValue)
    )

    return [filteredSelected, filteredAll]
  }, [defferedValue, selected.length])

  const handleAddRegion = (region: ChartItem) => {
    const isError = onAddItem(region)

    if (isError) {
      openAlert({
        severity: "danger",
        text: translate("chart.max_items_error"),
      })
    }
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const selectedItems = filteredSelectedItems.map((item) => (
    <ChartManagerModalRegion
      key={item.id}
      onClick={() => onRemoveItem(item.id)}
      region={{ ...item, isSelected: true }}
      data-testid="chart-manager-region"
    />
  ))

  const allItems = filteredAllItems.map((item) => {
    const isSelected = selectedIds.has(item.id)

    const handleClick = () => {
      if (isSelected) {
        onRemoveItem(item.id)
      } else {
        handleAddRegion(item)
      }
    }

    return (
      <ChartManagerModalRegion
        key={item.id}
        onClick={handleClick}
        region={{ ...item, isSelected: selectedIds.has(item.id) }}
        data-testid="chart-manager-region"
      />
    )
  })

  return (
    <ModalContainer
      title={translate("pages.indicator.edit_chart")}
      size="medium"
      className="chart-manager-modal"
      onClose={onClose}
    >
      <div className="chart-manager-modal__container">
        <SearchInput
          onChange={handleInput}
          value={value}
          onClear={clearValue}
          data-testid="chart-manager-search-field"
        />
        <div className="chart-manager-modal__lists">
          <ul className="chart-manager-modal__list">{selectedItems}</ul>
          <ul className="chart-manager-modal__list">{allItems}</ul>
        </div>
      </div>
    </ModalContainer>
  )
}

export default memo(ChartManagerModal)
