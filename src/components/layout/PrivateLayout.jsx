import { Outlet } from "react-router-dom";
import PrivateNavbar from "../PrivateNavbar";

const PrivateLayout = () => {
  return (
    <>
      <PrivateNavbar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
