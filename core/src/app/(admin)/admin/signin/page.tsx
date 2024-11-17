import SigninForm from "@/containers/forms/signin-form/SigninForm"
import "@/app/(admin)/admin/signin/styles.scss"

export { default as metadata } from "@/app/(admin)/admin/signin/metadata"

const SigninPage = () => {
  return (
    <main>
      <div className="container">
        <div className="signin-page">
          <div className="signin-page__form-container">
            <SigninForm />
          </div>
        </div>
      </div>
    </main>
  )
}

export default SigninPage
