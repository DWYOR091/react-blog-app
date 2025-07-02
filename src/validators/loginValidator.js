const isEmail = (value) => {
    const regex = /^(?![^@]+@[^@]+\.[^@]+$).+$/
    const result = regex.test(String(value).toLowerCase())
    return result
}

const loginValidator = ({ email, password }) => {
    const errors = {
        email: "",
        password: ""
    }

    if (!email) {
        errors.email = "Email is required"
    } else if (isEmail(email)) {
        errors.email = "Invalid email"
    }

    if (!password) {
        errors.password = "Password is required"
    }

    return errors
}

export default loginValidator