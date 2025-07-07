import { Slide, toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
import changePassword from "../validators/changePassword";

const initialForm = {
  oldPassword: "",
  newPassword: "",
};

const initialErrorForm = {
  oldPassword: "",
  newPassword: "",
};

const Setting = () => {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState(initialErrorForm);
  const [loading, setLoading] = useState(false);

  //handle change
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = changePassword(formData);
    if (validator.oldPassword || validator.newPassword) {
      setError(validator);
    } else {
      try {
        setLoading(true);
        setError(null);
        const reqBody = {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        };

        const res = await axiosInstance.post("auth/change-password", reqBody);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });

        setLoading(false);
        setFormData(initialForm);
      } catch (error) {
        setLoading(false);
        console.log(error);
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
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "31em" }}
    >
      <form action="" className="w-50" onSubmit={handleSubmit}>
        <div className="border border-2 rounded-2 p-4 shadow-lg">
          <h2 className="text-center my-4">Change Password</h2>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="*****"
              className="form-control"
              onChange={handleChange}
              value={formData.oldPassword}
            />
          </div>
          {error && <p className="text-danger">{error.oldPassword}</p>}
          <div className="form-group">
            <label htmlFor="" className="form-label">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="*****"
              className="form-control"
              onChange={handleChange}
              value={formData.newPassword}
            />
          </div>
          {error && <p className="text-danger">{error.newPassword}</p>}
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

export default Setting;
