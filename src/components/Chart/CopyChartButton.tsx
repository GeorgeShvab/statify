'use client'

import html2canvas from 'html2canvas'
import dynamic from 'next/dynamic'
import { FC, useState } from 'react'

interface State {
  isSuccess: boolean
  isError: boolean
}

const Alert = dynamic(() => import('@/ui/Alert/Alert'), { ssr: false })

const CopyChartButton: FC = () => {
  const [state, setState] = useState<State>({ isError: false, isSuccess: false })

  const makeCanvasFromChartElement = async (element: HTMLElement) => {
    const canvas = await html2canvas(element, {
      onclone: function (document) {
        // To change styles of elements in the image because of some styles bug in this library
        const chart = document.getElementsByClassName('chart-label-color')

        Array.from(chart).forEach((item) => {
          item.classList.add('translate-y-2')
        })
      },
    })

    return canvas
  }

  const handleCopy = async () => {
    try {
      const chart = document.getElementById('chart')

      if (!ClipboardItem || !navigator || !chart) throw new Error()

      const canvas = await makeCanvasFromChartElement(chart)

      canvas.toBlob(async function (blob) {
        if (!blob) {
          setState({ isSuccess: false, isError: true })
        } else {
          const item = new ClipboardItem({ 'image/png': blob })
          await navigator.clipboard.write([item])

          setState({ isSuccess: true, isError: false })
        }
      })
    } catch (e) {
      setState({ isError: true, isSuccess: false })
    }
  }

  return (
    <>
      <Alert
        show={state.isSuccess}
        severity="success"
        text="The chart has been copied to clipboard"
        onClose={() => setState({ isError: false, isSuccess: false })}
      />
      <Alert
        show={state.isError}
        severity="danger"
        text="Unable to copy the chart"
        onClose={() => setState({ isError: false, isSuccess: false })}
      />
      <button
        className={
          'h-8 w-8 flex justify-center items-center text-neutral-400 hover:text-neutral-600 transition-colors rounded-full'
        }
        aria-label="Copy the chart as an image"
        title="Copy the chart as an image"
        onClick={handleCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.25}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
          />
        </svg>
      </button>
    </>
  )
}

export default CopyChartButton
