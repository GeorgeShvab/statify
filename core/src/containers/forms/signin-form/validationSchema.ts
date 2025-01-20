import * as yup from "yup"
import translate from "@/modules/i18n"

const incorrectCredentialsMessage = translate(
  "validation.incorrect_credentials"
)

const signinValidationSchema = yup.object({
  email: yup
    .string()
    .email(incorrectCredentialsMessage)
    .required(incorrectCredentialsMessage),
  password: yup
    .string()
    .min(12, incorrectCredentialsMessage)
    .max(100, incorrectCredentialsMessage)
    .required(incorrectCredentialsMessage),
})

export default signinValidationSchema
