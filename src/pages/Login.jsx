const Login = () => {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <form action="" className="w-50">
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="*****"
              className="form-control"
            />
          </div>
          <div className="form-group mt-3 text-center mt-3">
            <button type="submit" className="btn  btn-primary me-2 w-25">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
