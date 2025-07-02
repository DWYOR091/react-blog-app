import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
const PrivateNavbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem("blogData");
    toast.success("Logout successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
      transition: Slide,
    });
    navigate("/login");
  };
  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/categories"}>Categories</NavLink>
      <NavLink to={"/posts"}>Posts</NavLink>
      <NavLink to={"/profile"}>Profile</NavLink>
      <NavLink to={"/setting"}>Setting</NavLink>
      <NavLink
        to={"/login"}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Logout
      </NavLink>
      {/* <button type="button" class="btn btn-primary">
        Launch demo modal
      </button> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* <div className="modal-body">...</div> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                data-bs-dismiss="modal"
                type="button"
                onClick={logout}
                className="btn btn-success"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
