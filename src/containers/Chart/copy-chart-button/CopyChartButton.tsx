"use client"

import CopyIcon from "@/ui/icons/CopyIcon"
import html2canvas from "html2canvas"
import { FC } from "react"
import { useAlert } from "@/providers/alert-provider/AlertProvider"

const CopyChartButton: FC = () => {
  const { openAlert } = useAlert()

  const makeCanvasFromChartElement = async (element: HTMLElement) => {
    const canvas = await html2canvas(element, {
      onclone: function (document) {
        // To change styles of labels in the image because of some styles bug in this library
        const labels = document.getElementsByClassName("chart-label-color")

        // To hide buttons and change other styles (there are some difference in spacing between real page and output image)
        const elementsToHide = document.getElementsByClassName(
          "html2canvas-hide-element"
        )
        const chartHeader = document.getElementById("chart-header")
        const chartContainerElement = document.getElementById("chart")
        const chartElement = document.querySelector(".country-row-chart")

        if (chartContainerElement) {
          chartContainerElement.className = `${chartContainerElement.className} !pt-1 md:!pt-1 !border-0`
        }

        if (chartElement)
          chartElement.className = `${chartElement.className} !mb-1 md:!mb-2.5`

        if (chartHeader)
          chartHeader.className = `${chartHeader.className} !mb-2 md:!mb-4`

        Array.from(labels).forEach((item) =>
          item.classList.add("translate-y-2")
        )
        Array.from(elementsToHide).forEach((item) =>
          item.classList.add("hidden")
        )
      },
    })

    return canvas
  }

  const handleCopy = async () => {
    try {
      const chart = document.getElementById("chart")

      if (!ClipboardItem || !navigator || !chart) throw new Error()

      const canvas = await makeCanvasFromChartElement(chart)

      canvas.toBlob(async function (blob) {
        if (!blob) {
          openAlert({ text: "Unable to copy the chart", severity: "danger" })
        } else {
          const item = new ClipboardItem({ "image/png": blob })
          await navigator.clipboard.write([item])

          openAlert({
            text: "The chart was copied successfully",
            severity: "success",
          })
        }
      })
    } catch (e) {
      openAlert({ text: "Unable to copy the chart", severity: "danger" })
    }
  }

  return (
    <button
      className="h-8 w-8 flex justify-center items-center text-neutral-400 hover:text-neutral-600 transition-colors rounded-full html2canvas-hide-element"
      aria-label="Copy the chart as an image"
      title="Copy the chart as an image"
      onClick={handleCopy}
    >
      <CopyIcon />
    </button>
  )
}

export default CopyChartButton
