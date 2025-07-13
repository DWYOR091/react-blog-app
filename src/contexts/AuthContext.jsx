import { createContext, use, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const stringifyBlogData = window.localStorage.getItem("blogData");
    if (stringifyBlogData) {
      const blogData = JSON.parse(stringifyBlogData);
      const user = blogData.user;
      setAuth(user);
    } else {
      setAuth(null);
    }
  }, [navigate, location]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
