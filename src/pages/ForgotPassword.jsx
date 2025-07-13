import axios from "axios";
import { useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
import { Slide, toast } from "react-toastify";
import { forgotPass, recoverPass } from "../validators/forgotPassword";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState();
  const [error, seterror] = useState(null);
  const [formEmail, setFormEmail] = useState({ email: "" });
  const [formRecover, setformRecover] = useState({ code: "", password: "" });
  const [hasEmail, setHasEmail] = useState("");
  const navigate = useNavigate();

  const handleChangeSend = (e) => {
    setFormEmail({ email: e.target.value });
  };
  const handleChangeRecover = (e) => {
    setformRecover((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const validator = forgotPass(formEmail);
    if (validator.email) {
      seterror({ email: validator.email });
    } else {
      try {
        seterror(null);
        setLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/forgot-password",
          { email: formEmail.email }
        );
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
        setHasEmail(formEmail);
        setLoading(false);
        // navigate("/forgot-password");
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data?.email || error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
      }
    }
  };

  const handleNewPassword = async (e) => {
    e.preventDefault();
    const validator = recoverPass(formRecover);
    if (validator.code || validator.password) {
      seterror({ code: validator.code, password: validator.password });
    } else {
      try {
        seterror(null);
        setLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/recover-password",
          {
            email: hasEmail.email,
            code: formRecover.code,
            password: formRecover.password,
          }
        );
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        const errors = error.response?.data || null;
        if (errors?.message) {
          toast.error(errors.message, {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
            transition: Slide,
          });
        } else {
          for (const error in errors) {
            toast.error(errors[error], {
              position: "top-right",
              autoClose: 2000,
              theme: "light",
              transition: Slide,
            });
          }
        }
      }
    }
  };

  return (
    <div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "31em" }}
      >
        {!hasEmail ? (
          <form action="" className="w-50" onSubmit={handleSend}>
            <div className="border border-2 rounded-2 p-4 shadow-lg">
              <h2 className="text-center my-4">Recover Password</h2>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="xyz@gmail.com"
                  className="form-control"
                  onChange={handleChangeSend}
                  value={formEmail.email}
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
                    <span role="status">sending...</span>
                  </button>
                ) : (
                  <button type="submit" className="btn  btn-primary me-2 w-25">
                    send
                  </button>
                )}
              </div>
            </div>
          </form>
        ) : (
          <form action="" className="w-50" onSubmit={handleNewPassword}>
            <div className="border border-2 rounded-2 p-4 shadow-lg">
              <h2 className="text-center my-4">New Password</h2>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  name="code"
                  placeholder="123456"
                  className="form-control"
                  onChange={handleChangeRecover}
                  value={formRecover.code}
                />
              </div>
              {error && <p className="text-danger">{error.code}</p>}
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="xyz@gmail.com"
                  className="form-control"
                  onChange={handleChangeRecover}
                  value={formRecover.password}
                />
              </div>
              {error && <p className="text-danger">{error.password}</p>}
              <div className="form-group mt-3 text-center mt-3">
                {loading ? (
                  <button class="btn btn-primary" type="button" disabled>
                    <span
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status">sending...</span>
                  </button>
                ) : (
                  <button type="submit" className="btn  btn-primary me-2 w-25">
                    send
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
