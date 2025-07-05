import { useEffect, useState } from "react";
import newCategoryValidator from "../../validators/newCategoryValidator";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

const initialFormData = {
  title: "",
  desc: "",
  category: "",
};
const initialError = {
  title: "",
  desc: "",
  category: "",
};

const NewPost = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialError);
  const [selectCategory, setSelectCategory] = useState([]);
  const [isEnable, setIsEnable] = useState(false);
  const [idFile, setIdFile] = useState(null);
  const [errorExtension, setErrorExtension] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get("category");
        setSelectCategory(response.data.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleChangeFile = async (e) => {
    //cek forminput
    // for (const pair of formInput) {
    //   console.log(`${pair[0]}: `, pair[1]);
    // }
    const file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      try {
        setErrorExtension(null);
        const formInput = new FormData();
        formInput.append("image", file);
        setIsEnable(true);
        const response = await axiosInstance.post("file/upload", formInput, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const data = response.data;
        setIdFile(data.data.newFile._id);
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
        setIsEnable(false);
      } catch (error) {
        toast.success(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          transition: Slide,
        });
      }
    } else {
      setErrorExtension("Just format png, jpeg, and jpg allowed");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = newCategoryValidator(formData);
    if (validator.title || validator.desc) {
      setError(validator);
    } else {
      try {
        setLoading(true);
        setError(initialError);
        const reqBody = {
          title: formData.title,
          desc: formData.desc,
          category: formData.category,
          file: idFile,
        };
        const response = await axiosInstance.post("post", reqBody);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
        setFormData(initialFormData);
        setLoading(false);
        navigate("/posts");
      } catch (error) {
        setLoading(false);
        console.log(error.response.data);
        if (error.response && error.response.data) {
          const errors = error.response.data;
          for (const key in errors) {
            toast.error(errors[key], {
              position: "top-right",
              autoClose: 2000,
              theme: "light",
              transition: Slide,
            });
          }
        } else {
          toast.error(error.response?.data?.message || "Something went wrong", {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
            transition: Slide,
          });
        }
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
            <h2 className="text-center my-4 fw-bold h3">New Post</h2>
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
                name="desc"
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
            <div className="form-group mb-3">
              <label htmlFor="">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleChangeFile}
              />
            </div>
            {errorExtension && <p className="text-danger">{errorExtension}</p>}
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Category
              </label>
              <select
                name="category"
                id=""
                className="form-select"
                onChange={handleChange}
              >
                <option disabled selected>
                  Select Category
                </option>
                {selectCategory.map((c) => {
                  return (
                    <option value={c._id} key={c._id}>
                      {c.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group mt-3">
              {loading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status"> saving...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary me-2"
                  disabled={isEnable}
                >
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
export default NewPost;
