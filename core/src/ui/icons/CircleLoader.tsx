import { FC } from "react"
import { IconProps } from "@/types/general.types"

const CircleLoader: FC<IconProps> = (props) => {
  return (
    <svg
      className="spinner"
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        cx="10"
        cy="10"
        r="9"
      ></circle>
    </svg>
  )
}

export default CircleLoader
