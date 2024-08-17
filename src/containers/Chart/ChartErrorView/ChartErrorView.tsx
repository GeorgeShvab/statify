import { FC, ReactNode } from 'react'

interface ChartErrorViewProps {
  children: ReactNode
}

const ChartErrorView: FC<ChartErrorViewProps> = ({ children }) => {
  return (
    <div className='!h-[300px] md:!h-[480px] mb-3 md:mb-5 flex justify-center items-center'>
      <p className='text-sm md:text-base text-neutral-400'>{children}</p>
    </div>
  )
}

export default ChartErrorView
