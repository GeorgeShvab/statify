'use client'

import { FC, useState } from 'react'
import Modal from '@/components/Modal'
import ChartManager from '@/components/Chart/ChartManager/ChartManager'
import AddItemIcon from '@/ui/Icons/AddItemIcon'

const ChartManagerButton: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const toggleChartManager = () => setIsOpened((prev) => !prev)

  return (
    <>
      <Modal opened={isOpened} onClose={() => setIsOpened(false)}>
        <ChartManager />
      </Modal>
      <button
        className={`h-8 w-8 flex justify-center items-center text-neutral-400 hover:text-neutral-600 transition-colors rounded-full html2canvas-hide-element ${
          isOpened ? 'bg-neutral-100' : ''
        }`}
        onClick={toggleChartManager}
        aria-label='Edit chart'
        title='Edit chart'
      >
        <AddItemIcon />
      </button>
    </>
  )
}

export default ChartManagerButton
