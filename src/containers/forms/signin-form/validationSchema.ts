import messages from "@/messages"
import * as yup from "yup"

const incorrectCredentialsMessage = messages.credentials_error

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
