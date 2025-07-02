import { Slide, toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useState } from "react";
import loginValidator from "../validators/loginValidator";
import { useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
};
const initialError = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validator = loginValidator({
      email: form.email,
      password: form.password,
    });

    if (validator.email || validator.password) {
      setError(validator);
    } else {
      try {
        setLoading(true);
        setError(initialError);
        const reqBody = {
          email: form.email,
          password: form.password,
        };
        const response = await axios.post(`auth/signin`, reqBody);
        const blogData = JSON.stringify(response.data.data);
        window.localStorage.setItem("blogData", blogData);
        setLoading(false);
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

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form action="" className="w-50" onSubmit={handleSubmit}>
        <div className="border border-2 rounded-2 p-4 shadow-lg">
          <h2 className="text-center my-4">Login</h2>
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
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="*****"
              className="form-control"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          {error && <p className="text-danger">{error.password}</p>}
          <div className="form-group mt-3 text-center mt-3">
            {loading ? (
              <button className="btn  btn-primary me-2 w-25" disabled>
                logging ...
              </button>
            ) : (
              <button type="submit" className="btn  btn-primary me-2 w-25">
                Login
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
