import Link from 'next/link'
import { FC } from 'react'
import SearchBar from '../SearchBar/SearchBar'

const Header: FC = () => {
  return (
    <header className="">
      <div className="flex justify-center bg-white border-b p-3.5 md:p-5">
        <Link href="/" className="font-bold text-3xl font-serif">
          Statify
        </Link>
      </div>
      <div className="container py-3 md:py-5">
        <SearchBar />
      </div>
    </header>
  )
}

export default Header
