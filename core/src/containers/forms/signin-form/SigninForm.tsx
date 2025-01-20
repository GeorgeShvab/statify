"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/ui/button/Button"
import Input from "@/ui/input/Input"
import { SigninFormValues } from "@/containers/forms/signin-form/SigninForm.types"
import signinValidationSchema from "@/containers/forms/signin-form/validationSchema"
import useSignin from "@/hooks/use-signin/useSignin"
import translate from "@/modules/i18n"
import "@/containers/forms/signin-form/styles.scss"

const SigninForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SigninFormValues>({
    resolver: yupResolver(signinValidationSchema),
    reValidateMode: "onSubmit",
  })

  const [signin, data] = useSignin()

  const onSubmit = async (values: SigninFormValues) => {
    await signin(values)
  }

  const serverCredentialsError = data.data?.error

  const emailErrorMsg = errors.email?.message || serverCredentialsError
  const passwordErrorMsg = errors.password?.message || serverCredentialsError

  const errorText = emailErrorMsg || passwordErrorMsg || <>&nbsp;</>

  return (
    <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
      <h4 className="signin-form__title">
        {translate("pages.signin.heading")}
      </h4>
      <fieldset className="signin-form__fieldset">
        <label className="signin-form__input-container">
          <Input
            className="signin-form__input"
            autoComplete="email"
            placeholder={translate("common.email")}
            isError={Boolean(emailErrorMsg)}
            data-testid="signin-email-input"
            {...register("email")}
          />
        </label>
        <label className="signin-form__input-container">
          <Input
            className="signin-form__input"
            autoComplete="password"
            placeholder={translate("common.password")}
            type="password"
            isError={Boolean(passwordErrorMsg)}
            data-testid="signin-password-input"
            {...register("password")}
          />
        </label>
      </fieldset>
      <p className="signin-form__error-message">{errorText}</p>
      <Button
        className="signin-form__submit-button"
        type="submit"
        isLoading={data.isLoading}
      >
        {translate("common.signin")}
      </Button>
      <p className="signin-form__help-label">
        {translate("pages.signin.need_help")}
      </p>
    </form>
  )
}

export default SigninForm
