import { Navigate, NavLink } from "react-router-dom";

const PrivateNavbar = () => {
  const auth = true;
  if (!auth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/categories"}>Categories</NavLink>
      <NavLink to={"/posts"}>Posts</NavLink>
      <NavLink to={"/profile"}>Profile</NavLink>
      <NavLink to={"/setting"}>Setting</NavLink>
      <NavLink to={"/logout"}>Logout</NavLink>
    </nav>
  );
};

export default PrivateNavbar;
