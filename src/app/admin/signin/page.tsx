import SigninForm from "@/containers/forms/signin-form/SigninForm"
import "@/app/admin/signin/styles.scss"

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
