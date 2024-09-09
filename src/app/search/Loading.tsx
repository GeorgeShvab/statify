import { FC } from "react"
import IndicatorCardLoader from "@/components/indicator-card/Loader"

const Loading: FC = () => {
  return (
    <>
      <div className="container">
        <h2 className="mb-1.5 md:mb-3 px-2 font-semibold">
          Search results for
        </h2>
      </div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {new Array(9).fill(null).map((item, index) => (
          <IndicatorCardLoader key={index} />
        ))}
      </div>
    </>
  )
}

export default Loading
