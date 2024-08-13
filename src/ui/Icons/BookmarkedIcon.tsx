import { IconProps } from '@/types'
import { FC } from 'react'

const BookmarkedIcon: FC<IconProps> = (props) => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    height='1em'
    width='1em'
    className='w-6 h-6'
    {...props}
  >
    <path d='M2 2v13.5a.5.5 0 00.74.439L8 13.069l5.26 2.87A.5.5 0 0014 15.5V2a2 2 0 00-2-2H4a2 2 0 00-2 2z' />
  </svg>
)

export default BookmarkedIcon
