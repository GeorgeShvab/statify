import { ChartCountry } from '@/types'
import { FC, memo, useState } from 'react'

interface Props {
  isSelected: boolean
  onClick: (data: string) => void
  id: string
  name: string
}

const Region: FC<Props> = ({ onClick, ...props }) => {
  const handleClick = () => {
    onClick(props.id)
  }

  return (
    <li
      className={`px-6 pr-3 text-sm flex items-center justify-between ${props.isSelected ? 'bg-neutral-100' : ''}`}
      onClick={handleClick}
    >
      <span className="text-neutral-700">{props.name}</span>
      <button
        className="text-neutral-500 h-10 w-10 flex justify-center items-center"
        aria-label={props.isSelected ? 'Unselect' : 'Select'}
      >
        {props.isSelected ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        )}
      </button>
    </li>
  )
}

export default memo(Region)
