import { useCallback, useState } from "react"
import IconButton from "@/ui/icon-button/IconButton"
import AddItemIcon from "@/ui/icons/AddItemIcon"
import CopyIcon from "@/ui/icons/CopyIcon"
import ChartElement from "@/containers/indicator-chart-section/components/chart-element/ChartElement"
import { IndicatorChartContainerProps } from "@/containers/indicator-chart-section/components/indicator-chart-container/types"
import getScaleUnit from "@/containers/indicator-chart-section/utils/get-scale-unit/getScaleUnit"
import IndicatorDataSection from "@/containers/indicator-data/components/indicator-data-section/IndicatorDataSection"
import ChartManagerModal from "@/containers/modals/chart-manager-modal/ChartManagerModal"
import ChartLegend from "@/components/chart/components/chart-legend/ChartLegend"
import ChartTitle from "@/components/chart/components/chart-title/ChartTitle"
import RangeSlider from "@/components/chart/components/range-slider/RangeSlider"
import Modal from "@/components/modal/Modal"
import { useAlert } from "@/providers/alert-provider/AlertProvider"
import { useChartContext } from "@/providers/chart-provider/ChartProvider"
import { isEmptyChartStore } from "@/store/chart-store/utils"
import capitalize from "@/utils/capitalize/capitalize"
import saveToClipboardAsImage from "@/utils/save-to-clipboard-as-image/saveToClipboardAsImage"
import "@/containers/indicator-chart-section/components/indicator-chart-container/styles.scss"

const getSubtitle = (shortening: number | null, unit: string) => {
  const showScaledSubtitle = shortening && shortening > 1

  const subTitle = showScaledSubtitle
    ? `${getScaleUnit(shortening)}${unit}`
    : capitalize(unit)

  return subTitle
}

const IndicatorChartContainer = ({
  indicator: { unit, label },
  data: allData,
}: IndicatorChartContainerProps) => {
  const store = useChartContext()

  const [isOpen, setIsOpen] = useState(false)

  const { openAlert } = useAlert()

  const isEmpty = isEmptyChartStore(store)

  const subTitle = unit ? getSubtitle(store.shortening, unit) : ""

  const handleSaveChartToClipboard = async () => {
    const chartElement = document.getElementById("indicator-chart")

    try {
      if (!chartElement) throw new Error()

      await saveToClipboardAsImage(chartElement, {
        onclone: (document, el) => {
          const labels = document.getElementsByClassName(
            "chart-legend__label-color"
          )

          const hiddenEls =
            document.getElementsByClassName("html2canvas-hidden")

          Array.from(labels).forEach(
            (item) => ((item as HTMLElement).style.marginTop = "7px")
          )
          Array.from(hiddenEls).forEach((item) => item.remove())

          el.style.paddingBottom = "16px"
        },
      })

      openAlert({
        severity: "success",
        text: "The chart was copied to the clipboard",
      })
    } catch {
      openAlert({
        severity: "danger",
        text: "Unexpected error occured, the chart was not copied to clipboard",
      })
    }
  }

  const handleCloseModal = useCallback(() => setIsOpen(false), [])
  const handleOpenModal = useCallback(() => setIsOpen(true), [])

  const showChartManagerButton = allData.length > 1

  return (
    <>
      <Modal opened={isOpen} onClose={handleCloseModal}>
        <ChartManagerModal
          onAddItem={store.add}
          onRemoveItem={store.remove}
          selected={store.data}
          data={allData}
          onClose={handleCloseModal}
        />
      </Modal>
      <IndicatorDataSection>
        <div id="indicator-chart">
          <ChartTitle
            className="indicator-chart-container__header"
            title={label}
            subtitle={subTitle}
          />
          <ChartElement store={store} />
          <ChartLegend items={store.data} />
          {showChartManagerButton && (
            <IconButton
              color="light"
              className="indicator-chart-container__manager-button html2canvas-hidden"
              aria-label="Edit chart"
              title="Edit chart"
              size="small"
              onClick={handleOpenModal}
            >
              <AddItemIcon />
            </IconButton>
          )}
          <IconButton
            color="light"
            className="indicator-chart-container__copy-button html2canvas-hidden"
            aria-label="Copy the chart as an image"
            title="Copy the chart as an image"
            size="small"
            onClick={handleSaveChartToClipboard}
          >
            <CopyIcon />
          </IconButton>
        </div>
      </IndicatorDataSection>
      <IndicatorDataSection className="indicator-chart-container__range-slider">
        {isEmpty ? (
          <div className="range-slider-fallback" />
        ) : (
          <RangeSlider
            range={store.range}
            selectedRange={store.selectedRange}
            handleSelectRange={store.selectRange}
          />
        )}
      </IndicatorDataSection>
    </>
  )
}

export default IndicatorChartContainer
