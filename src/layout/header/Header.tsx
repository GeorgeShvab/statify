import { FC } from "react"
import Link from "next/link"
import "@/layout/header/styles.scss"

const Header: FC = () => {
  return (
    <header className="header">
      <Link href="/" className="header__logo">
        Statify
      </Link>
    </header>
  )
}

export default Header
