'use client'

import { FC, useState } from 'react'
import Modal from '../../Modal'
import ManageRegions from './ManageRegions'

const AddItmeButton: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  return (
    <>
      <Modal opened={isOpened} onClose={() => setIsOpened(false)}>
        <ManageRegions />
      </Modal>
      <button
        className={`h-8 w-8 flex justify-center items-center text-neutral-400 hover:text-neutral-600 transition-colors rounded-full ${
          isOpened ? 'bg-neutral-100' : ''
        }`}
        onClick={() => setIsOpened((prev) => !prev)}
        aria-label="Manage regions"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </>
  )
}

export default AddItmeButton
