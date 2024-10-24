"use client"

import { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Button from "@/ui/button/Button"
import routes from "@/constants/routes"
import "@/layout/admin-header/styles.scss"

const AdminHeader: FC = () => {
  const path = usePathname()

  const isIndicators = path.includes("indicators")
  const isCountries = path.includes("countries")
  const isValues = path.includes("values")

  return (
    <header className="admin-header">
      <div className="admin-header__container">
        <Link
          href="/"
          className="admin-header__logo font-bold text-3xl font-serif"
        >
          Statify
        </Link>
        <nav className="admin-header__nav">
          <ul className="admin-header__nav-list">
            <li>
              <Button
                size="small"
                className="admin-header__nav-item"
                variant={isIndicators ? "contained" : "text"}
                color={isIndicators ? "light" : "dark"}
                href={routes.admin.indicators}
              >
                Indicators
              </Button>
            </li>
            <li>
              <Button
                size="small"
                className="admin-header__nav-item"
                variant={isCountries ? "contained" : "text"}
                color={isCountries ? "light" : "dark"}
                href={routes.admin.countries}
              >
                Countries
              </Button>
            </li>
            <li>
              <Button
                size="small"
                className="admin-header__nav-item"
                variant={isValues ? "contained" : "text"}
                color={isValues ? "light" : "dark"}
                href={routes.admin.values}
              >
                Values
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AdminHeader
