const newCategoryValidator = ({ title, description }) => {
    const errors = {
        title: "",
        description: ""
    }

    if (!title) {
        errors.title = "Title is required"
    } else if (title.length < 3) {
        errors.title = "Title must be 3 char"
    }

    if (!description) {
        errors.description = "Description is required"
    } else if (description.length < 5) {
        errors.description = "Description mus be 5 char"
    }

    return errors
}

export default newCategoryValidator