import Link from 'next/link'
import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="p-4 bg-white border-t">
      <div className="container">
        <div className="md:flex justify-center md:justify-between flex-wrap md:flex-row-reverse gap-4">
          <ul className="flex gap-12 justify-center mb-4 md:mb-0">
            <li className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors">
              <Link href="/bookmarks">Bookmarks</Link>
            </li>
            <li className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors">
              <Link href="/search">Search</Link>
            </li>
          </ul>
          <p className="flex justify-center items-center text-sm text-neutral-500">
            &copy; 2023 Heorhii Shvab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
