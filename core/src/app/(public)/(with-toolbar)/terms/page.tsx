import { FC } from "react"
import translate from "@/modules/i18n"
import "@/app/(public)/(with-toolbar)/terms/styles.scss"

export { default as metadata } from "@/app/(public)/(with-toolbar)/terms/metadata"

const Page: FC = () => {
  return (
    <section className="container">
      <div className="terms-page">
        <h1 className="terms-page__title">
          {translate("pages.terms_of_use.title")}
        </h1>
        <p className="terms-page__paragraph">
          {translate("pages.terms_of_use.last_update")}
        </p>
        <p className="terms-page__paragraph">
          {translate("pages.terms_of_use.welcome")}
        </p>
        <h4 className="terms-page__section-title">
          {translate("pages.terms_of_use.liability_title")}
        </h4>
        <p className="terms-page__paragraph">
          {translate("pages.terms_of_use.liability_text")}
        </p>
        <h4 className="terms-page__section-title">
          {translate("pages.terms_of_use.use_of_information_title")}
        </h4>
        <p className="terms-page__paragraph">
          {translate("pages.terms_of_use.use_of_information_text")}
        </p>
        <h4 className="terms-page__section-title">
          {translate("pages.terms_of_use.privacy_title")}
        </h4>
        <p className="terms-page__paragraph">
          {translate("pages.terms_of_use.privacy_text")}
        </p>
        <h4 className="terms-page__section-title">
          {translate("pages.terms_of_use.ownership_title")}
        </h4>
        <p className="terms-page__paragraph">
          {translate("pages.terms_of_use.ownership_text")}
        </p>
        <h4 className="terms-page__section-title">
          {translate("pages.terms_of_use.contact_title")}
        </h4>
        <p className="terms-page__paragraph">
          {translate("pages.terms_of_use.contact_text", {
            a: (chunk: string[]) => (
              <a href="mailto:georgiy.shvab@gmail.com" className="link">
                {chunk}
              </a>
            ),
          })}
        </p>
      </div>
    </section>
  )
}

export default Page
