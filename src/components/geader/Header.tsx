import Link from 'next/link'
import { FC } from 'react'

const Header: FC = () => {
  return (
    <header>
      <div className='flex justify-center bg-white border-b p-3.5 md:p-5 relative'>
        <Link href='/' className='font-bold text-3xl font-serif'>
          Statify
        </Link>
      </div>
    </header>
  )
}

export default Header
