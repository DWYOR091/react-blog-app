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
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* <div class="modal-body">...</div> */}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                data-bs-dismiss="modal"
                type="button"
                onClick={logout}
                class="btn btn-success"
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
