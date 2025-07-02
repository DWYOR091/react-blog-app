import { useState } from "react";
import newCategoryValidator from "../../validators/newCategoryValidator";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

const initialFormData = {
  title: "",
  description: "",
};
const initialError = {
  title: "",
  description: "",
};

const NewCategory = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialError);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = newCategoryValidator(formData);
    if (validator.title || validator.description) {
      setError(validator);
    } else {
      try {
        setLoading(true);
        setError(initialError);
        const reqBody = {
          title: formData.title,
          description: formData.description,
        };
        const response = await axiosInstance.post("category", reqBody);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
        setFormData(initialFormData);
        console.log(response);
        setLoading(false);
        navigate("/categories");
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
      }
    }
  };
  return (
    <div className="container mt-3 vh-100">
      <button className="btn btn-dark" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="d-flex justify-content-center mt-5">
        <form action="" className="w-50" onSubmit={handleSubmit}>
          <div className="border border-2 rounded-2 p-4 shadow-lg">
            <h2 className="text-center my-4 fw-bold h3">New Category</h2>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="hello world"
                className="form-control"
                onChange={handleChange}
                value={formData.title}
              />
            </div>
            {error && <p className="text-danger">{error.title}</p>}
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                id=""
                value={formData.description}
                placeholder="bla bla bla ..."
                className="form-control"
                cols={30}
                rows={5}
                onChange={handleChange}
              >
                {formData.description}
              </textarea>
            </div>
            {error && <p className="text-danger">{error.description}</p>}
            <div className="form-group mt-3">
              {loading ? (
                <button class="btn btn-primary" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status"> saving...</span>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary me-2">
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewCategory;
