import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import axios from "axios";
import { Slide, toast } from "react-toastify";

const VerifyUser = () => {
  const [formData, setFormData] = useState({ code: "" });
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const [loadingVerif, setloadingVerif] = useState(false);
  const navigate = useNavigate();
  const user = useAuth();
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ code: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.code) {
        setloading(true);
        const res = await axiosInstance.post("auth/verify-user", {
          code: formData.code,
          email: user.email,
        });
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
        setloading(false);
        window.localStorage.removeItem("blogData");
        navigate("/login");
      } else {
        setloading(false);
        setError("Code is required");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });
      setloading(false);
    }
  };

  //kirim code
  const handleVerificationCode = async () => {
    try {
      setloadingVerif(true);
      const res = await axiosInstance.post("auth/verify-email", {
        email: user.email,
      });
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });
      setloadingVerif(false);
    } catch (error) {
      setloadingVerif(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });
    }
  };
  return (
    <div>
      <div className="mt-3 ms-5">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          Back
        </button>
        {loadingVerif ? (
          <button class="d-block btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span role="status">sending...</span>
          </button>
        ) : (
          <button
            className="d-block btn btn-primary"
            onClick={handleVerificationCode}
          >
            Send verification code
          </button>
        )}
      </div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "31em" }}
      >
        <form action="" className="w-50" onSubmit={handleSubmit}>
          <div className="border border-2 rounded-2 p-4 shadow-lg">
            <h2 className="text-center my-4">Verify User</h2>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Code
              </label>
              <input
                type="text"
                name="code"
                placeholder="312314"
                className="form-control"
                onChange={handleChange}
                value={formData.oldPassword}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
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
      </div>
    </div>
  );
};

export default VerifyUser;
