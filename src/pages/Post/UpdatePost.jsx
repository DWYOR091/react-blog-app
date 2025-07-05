import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//mencoba pakai yup dan react hook form
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  desc: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

const UpdatePost = () => {
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const [selectCategory, setSelectCategory] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get("category");
        setSelectCategory(response.data.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    const getPost = async () => {
      try {
        const response = await axiosInstance.get(`post/${id}`);
        const post = response.data.data.post;
        setValue("title", post.title);
        setValue("desc", post.desc);
        setValue("category", post.category?._id || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPost(false);
      }
    };

    getPost();
    getCategories();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put("post", data);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });
      navigate("/posts");
    } catch (error) {
      console.log(error);
      const msg =
        error.response?.data?.message || "Something went wrong during update";
      toast.error(msg, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingPost) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3 vh-100">
      <button className="btn btn-dark" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="d-flex justify-content-center mt-5">
        <form className="w-50" onSubmit={handleSubmit(onSubmit)}>
          <div className="border border-2 rounded-2 p-4 shadow-lg">
            <h2 className="text-center my-4 fw-bold h3">Update Post</h2>

            {/* Title */}
            <div className="form-group mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Hello world"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-danger">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="form-group mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                placeholder="Bla bla bla..."
                rows={5}
                {...register("desc")}
              />
              {errors.desc && (
                <p className="text-danger">{errors.desc.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="form-group mb-3">
              <label className="form-label">Category</label>
              <select className="form-select" {...register("category")}>
                <option value="">Select Category</option>
                {selectCategory.map((c) => (
                  <option value={c._id} key={c._id}>
                    {c.title}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-danger">{errors.category.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="form-group mt-3">
              {loading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
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

export default UpdatePost;
