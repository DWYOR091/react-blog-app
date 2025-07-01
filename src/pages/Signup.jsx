import { useState } from "react";
import signupValidator from "../validators/signupValidator";
import axios from "axios";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialErrorForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialErrorForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = signupValidator({
      name: form.name,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
    if (
      validator.name ||
      validator.email ||
      validator.password ||
      validator.confirmPassword
    ) {
      setError(validator);
    } else {
      try {
        setLoading(true);
        const reqBody = {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        };

        console.log(form);
        const response = await axios.post(
          "http://localhost:5000/api/v1/auth/signup",
          reqBody
        );
        console.log(response);
        setForm(initialForm);
        setError(initialErrorForm);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form action="" onSubmit={handleSubmit} className="w-50">
        <div className="border border-2 rounded-2 p-4 shadow-lg">
          <h2 className="text-center">Signup</h2>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Rifqi"
              className="form-control"
              onChange={handleChange}
              value={form.name}
            />
          </div>
          {error && (
            <div className="text-danger my-2">
              <small>{error.name}</small>
            </div>
          )}
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
          {error && (
            <div className="text-danger my-2">
              <small>{error.email}</small>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="******"
              className="form-control"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          {error && (
            <div className="text-danger my-2">
              <small>{error.password}</small>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="******"
              className="form-control"
              onChange={handleChange}
              value={form.confirmPassword}
            />
          </div>
          {error && (
            <div className="text-danger my-2">
              <small>{error.confirmPassword}</small>
            </div>
          )}
          <div className="form-group mt-3">
            {loading ? (
              <button className="btn btn-success me-2" disabled>
                saving...
              </button>
            ) : (
              <button type="submit" className="btn btn-success me-2">
                Save
              </button>
            )}
            <button type="reset" className="btn btn-warning">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
