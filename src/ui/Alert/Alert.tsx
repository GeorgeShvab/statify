'use client'

import { FC, ReactElement, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import DelayWrapper from '@/ui/Alert/DelayWrapper'
import Transition from '@/ui/Alert/Transition'

interface Props {
  show: boolean
  text: string | ReactElement
  onClose: () => void
  duration?: number
  severity?: 'danger' | 'success'
}

const Alert: FC<Props> = ({ show, text, onClose, severity }) => {
  const time = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (show) {
      clearTimeout(time.current)
      time.current = setTimeout(onClose, 5000)
    }

    return () => clearTimeout(time.current)
  }, [show])

  return createPortal(
    <DelayWrapper show={show} wrapper={<Transition />}>
      <div
        className={`z-50 fixed top-0 left-1/2 translate-x-[-50%] rounded-lg px-4 py-2 transition-all ${
          severity === 'success' ? 'bg-green-400' : 'bg-red-500'
        }`}
      >
        <p className='text-white text-sm md:text-base text-center'>{text}</p>
      </div>
    </DelayWrapper>,
    document.body
  )
}

export default Alert
