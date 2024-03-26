import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode | ReactNode[]
}

const DropdownContainer: FC<Props> = ({ children }) => {
  return (
    <div className="shadow min-w-full rounded-lg border bg-white">
      <ul className={`max-h-[300px] overflow-hidden rounded-lg`}>{children}</ul>
    </div>
  )
}

export default DropdownContainer
