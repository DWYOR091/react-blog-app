const signupValidator = ({ name, email, password, confirmPassword }) => {
    const errors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    if (!name) {
        errors.name = "Name is required"
    } else if (name.length < 3) {
        errors.name = "Name length at least 3 char"
    }

    if (!email) {
        errors.email = "Email is required"
    }

    if (!password) {
        errors.password = "Password is required"
    } else if (password.length < 6) {
        errors.password = "Password length mus be 6 char"
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Confirm password is required"
    } else if (confirmPassword.length < 6) {
        errors.confirmPassword = "Password length mus be 6 char"
    } else if (confirmPassword !== password) {
        errors.confirmPassword = "Confirm password doestn match"
    }

    return errors
}

export default signupValidator