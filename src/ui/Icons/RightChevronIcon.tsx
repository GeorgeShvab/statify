import { IconProps } from '@/types'
import { FC } from 'react'

const RightChevronIcon: FC<IconProps> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-6 h-6'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8.25 4.5l7.5 7.5-7.5 7.5'
    />
  </svg>
)

export default RightChevronIcon
