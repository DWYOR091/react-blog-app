const isEmail = (value) => {
    const regex = /^(?![^@]+@[^@]+\.[^@]+$).+$/
    const result = regex.test(String(value).toLowerCase())
    return result
}

const profileValidator = ({ name, email }) => {
    const errors = {
        name: "",
        email: "",
    }

    if (!email) {
        errors.email = "Email is required"
    } else if (isEmail(email)) {
        errors.email = "Invalid email"
    }

    if (!name) {
        errors.name = "name is required"
    } else if (name.length < 3) {
        errors.name = "Password must be 6 char"
    }

    return errors
}

export default profileValidator