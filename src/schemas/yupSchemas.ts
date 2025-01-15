import * as yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

export const registrationSchema = yup.object().shape({
  email: yup.string().email('email-error').required("required"),
  name: yup.string().min(2, 'name-min').max(32, 'name-max').required("required"),
  password: yup.string().matches(passwordRegex, { message: 'password-error' }).required("required"),
  passwordRepeat: yup.string().oneOf([yup.ref('password'), undefined], "password-repeat-error").required("required"),
  termsAndService: yup.boolean()
})

export const signInSchema = yup.object().shape({
  email: yup.string().email().required("required"),
  password: yup.string().required("required"),
  rememberMe: yup.boolean()
})