import { FC } from "react"
import "@/app/(public)/(with-toolbar)/terms/styles.scss"

export { default as metadata } from "@/app/(public)/(with-toolbar)/terms/metadata"

const Page: FC = () => {
  return (
    <section className="container">
      <div className="terms-page">
        <h1 className="terms-page__title">Terms of Use</h1>
        <p className="terms-page__paragraph">Last Updated: 01.02.2024</p>
        <p className="terms-page__paragraph">
          Welcome to Statify! By using our website, you agree to comply with and
          be bound by the following terms of use. Please read these terms
          carefully before using Statify.
        </p>
        <h4 className="terms-page__section-title">Disclaimer of Liability</h4>
        <p className="terms-page__paragraph">
          We do not guarantee the accuracy, completeness, or reliability of the
          data. All data is provided by IMF and The World Bank.
        </p>
        <h4 className="terms-page__section-title">Use of Information</h4>
        <p className="terms-page__paragraph">
          Users are allowed to use statistical data from Statify for personal,
          educational, or commercial purposes. The data should not be used for
          illegal or harmful activities.
        </p>
        <h4 className="terms-page__section-title">Privacy Policy</h4>
        <p className="terms-page__paragraph">
          Statify does not collect any users&apos; information. So there is no
          data to store or share.
        </p>
        <h4 className="terms-page__section-title">Ownership</h4>
        <p className="terms-page__paragraph">
          All design elements, code, scripts, and programming elements used on
          Statify are the intellectual property of Heorhii Shvab. Unauthorized
          reproduction, modification, or distribution of the code is strictly
          prohibited.
        </p>
        <h4 className="terms-page__section-title">Contact Information</h4>
        <p className="terms-page__paragraph-6">
          For questions, concerns, or requests related to the terms of use,
          please contact us at&nbsp;
          <a href="mailto:georgiy.shva@gmail.com" className="link">
            georgiy.shvab@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  )
}

export default Page
