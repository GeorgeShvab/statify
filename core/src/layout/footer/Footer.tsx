import { FC } from "react"
import Link from "next/link"
import translate from "@/modules/i18n"
import "@/layout/footer/styles.scss"

const Footer: FC = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer__container">
          <ul className="footer__list">
            <li className="footer__link">
              <Link href="/">{translate("common.home")}</Link>
            </li>
            <li className="footer__link">
              <Link href="/bookmarks">{translate("common.bookmarks")}</Link>
            </li>
            <li className="footer__link">
              <Link href="/search">{translate("common.search")}</Link>
            </li>
            <li className="footer__link">
              <Link href="/terms">{translate("footer.terms")}</Link>
            </li>
          </ul>
          <p className="footer__copyright" data-testid="footer-copyrights">
            {translate("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
