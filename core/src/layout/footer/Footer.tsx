import { FC } from "react"
import Link from "next/link"
import "@/layout/footer/styles.scss"

const Footer: FC = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer__container">
          <ul className="footer__list">
            <li className="footer__link">
              <Link href="/">Home</Link>
            </li>
            <li className="footer__link">
              <Link href="/bookmarks">Bookmarks</Link>
            </li>
            <li className="footer__link">
              <Link href="/search">Search</Link>
            </li>
            <li className="footer__link">
              <Link href="/terms">Terms of Use</Link>
            </li>
          </ul>
          <p className="footer__copyright" data-testid="footer-copyrights">
            &copy; 2023-2024 Heorhii Shvab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
