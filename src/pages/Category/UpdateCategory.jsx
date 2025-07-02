import { useEffect, useState } from "react";
import newCategoryValidator from "../../validators/newCategoryValidator";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();

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

        const response = await axiosInstance.put(`category/${id}`, reqBody);
        console.log(response);

        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });

        setFormData(initialFormData);
        setLoading(false);
        navigate("/categories");
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error(error?.response?.data?.message || "Update failed", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
      }
    }
  };

  useEffect(() => {
    const getOneCategory = async () => {
      try {
        const res = await axiosInstance.get(`category/detail/${id}`);
        setFormData(res.data.data.category);
      } catch (err) {
        console.error(err);
        toast.error("Gagal mengambil data kategori.");
      }
    };

    getOneCategory();
  }, [id]);

  return (
    <div className="container mt-3 vh-100">
      <button className="btn btn-dark" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="d-flex justify-content-center mt-5">
        <form className="w-50" onSubmit={handleSubmit}>
          <div className="border border-2 rounded-2 p-4 shadow-lg">
            <h2 className="text-center my-4 fw-bold h3">Update Category</h2>

            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                placeholder="hello world"
                className="form-control"
                onChange={handleChange}
                value={formData.title}
              />
              {error.title && <p className="text-danger">{error.title}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="bla bla bla ..."
                className="form-control"
                cols={30}
                rows={5}
                onChange={handleChange}
              />
              {error.description && (
                <p className="text-danger">{error.description}</p>
              )}
            </div>

            <div className="form-group mt-3">
              {loading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status"> Updating...</span>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary me-2">
                  Update
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
