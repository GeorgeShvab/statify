import { FC } from 'react'
import IndicatorCardLoader from '@/components/IndicatorCard/Loader'

const Loading: FC = () => {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {new Array(9).fill(null).map((item, index) => (
        <IndicatorCardLoader key={index} />
      ))}
    </div>
  )
}

export default Loading
