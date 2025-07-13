import { Slide, toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileValidator from "../validators/profileValidator";
import axiosInstance from "../utils/axiosInstance";

const initialForm = {
  name: "",
  email: "",
};
const initialError = {
  name: "",
  email: "",
};

const Profile = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [oldEmail, setOldEmail] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validator = profileValidator({
      name: form.name,
      email: form.email,
    });

    if (validator.email || validator.name) {
      setError(validator);
    } else {
      try {
        setLoading(true);
        setError(initialError);
        const reqBody = {
          name: form.name,
          email: form.email,
        };

        setLoading(false);
        const response = await axios.put(`auth/update-profile`, reqBody);
        if (oldEmail !== form.email) {
          window.localStorage.removeItem("blogData");
          navigate("/login");
        }

        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
          transition: Slide,
        });
        setForm(initialForm);
        navigate("/");
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
          transition: Slide,
        });
      }
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await axiosInstance.get("auth/current-user");
      const user = res.data.data.user;
      setForm({ name: user.name, email: user.email });
      setOldEmail(user.email);
    };
    getCurrentUser();
  }, []);
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "31em" }}
    >
      <form action="" className="w-50" onSubmit={handleSubmit}>
        <div className="border border-2 rounded-2 p-4 shadow-lg">
          <h2 className="text-center my-4">Update Profile</h2>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="name..."
              className="form-control"
              onChange={handleChange}
              value={form.name}
            />
          </div>
          {error && <p className="text-danger">{error.name}</p>}
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="xyz@gmail.com"
              className="form-control"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          {error && <p className="text-danger">{error.email}</p>}
          <div className="form-group mt-3 text-center mt-3">
            {loading ? (
              <button class="btn btn-primary" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status"> updating...</span>
              </button>
            ) : (
              <button type="submit" className="btn  btn-primary me-2 w-25">
                update
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
