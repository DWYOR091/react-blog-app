const changePassword = ({ oldPassword, newPassword }) => {
    const errors = {
        oldPassword: "",
        newPassword: ""
    }

    if (!oldPassword) {
        errors.oldPassword = "Old Passwod is required"
    }

    if (!newPassword) {
        errors.newPassword = "New Passwod is required"
    }

    return errors

}

export default changePassword