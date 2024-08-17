'use client'

import { FC, useRef } from 'react'
import { createPortal } from 'react-dom'
import DelayWrapper from '@/ui/Alert/DelayWrapper'
import Transition from '@/ui/Alert/Transition'
import { AlertProps } from '@/ui/Alert/Alert.types'
import getAlertBackgorundColor from '@/ui/Alert/utils/getAlertBackgroundColor'

const Alert: FC<AlertProps> = ({ show, text, severity }) => {
  const portalElement = useRef(document.querySelector('#portal')!)

  const bg = getAlertBackgorundColor(severity)

  return createPortal(
    <DelayWrapper show={show} wrapper={<Transition />}>
      <div
        className={`z-50 fixed top-0 left-1/2 translate-x-[-50%] rounded-lg px-4 py-2 transition-all ${bg}`}
      >
        <p className='text-white text-sm md:text-base text-center'>{text}</p>
      </div>
    </DelayWrapper>,
    portalElement.current
  )
}

export default Alert
