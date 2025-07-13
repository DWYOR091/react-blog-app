import { Navigate, Outlet } from "react-router-dom";
import PrivateNavbar from "../PrivateNavbar";
import { useAuth } from "../../contexts/AuthContext";

const PrivateLayout = () => {
  const auth = useAuth();
  if (auth === undefined) {
    return <div>Loading...</div>;
  }

  if (!auth) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <PrivateNavbar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
