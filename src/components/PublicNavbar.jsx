import { Navigate, NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav>
      <NavLink to={"/login"}>Login</NavLink>
      <NavLink to={"/signup"}>Signup</NavLink>
    </nav>
  );
};

export default PublicNavbar;
