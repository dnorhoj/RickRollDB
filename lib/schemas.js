import * as yup from 'yup'

export const signupSchema = yup.object().shape({
    username: yup
        .string()
        .required("Please enter a username")
        .matches(
            /^[a-zA-Z0-9_-]{3,15}$/,
            "Username must be 3 to 15 characters, only letters, numbers and -_"
        ),
    email: yup
        .string()
        .required("Please enter an email")
        .email("Please enter a valid email"),
    password: yup
        .string()
        .required("Please enter a password")
        .min(8, "Password has to be at least 8 characters long")
        .max(50, "Password can only be 50 characters long"),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref('password'), null], "The two passwords don't match")
})

export const createRickRollSchema = yup.object().shape({
    url: yup
        .string()
        .required("Please enter a url!")
        .min(11, "Not a valid url!")
})