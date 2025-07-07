const isEmail = (value) => {
    const regex = /^(?![^@]+@[^@]+\.[^@]+$).+$/
    const result = regex.test(String(value).toLowerCase())
    return result
}

export const forgotPass = ({ email }) => {
    const error = {
        email: ""
    }

    if (!email) {
        error.email = "email is required"
    } else if (isEmail(email)) {
        error.email = "invalid email"
    }

    return error
}

export const recoverPass = ({ code, password }) => {
    const errors = {
        code: "",
        password: ""
    }

    if (!code) {
        errors.code = "code is required"
    }

    if (!password) {
        errors.password = "password is required"
    }

    return errors
}