import { FC } from "react"
import { InputGroupProps } from "@/components/input-group/types"
import "@/components/input-group/styles.scss"

const InputGroup: FC<InputGroupProps> = ({ children }) => {
  return <div className="input-group">{children}</div>
}

export default InputGroup
