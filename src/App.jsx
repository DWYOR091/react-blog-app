import { Route, Routes } from "react-router-dom";
import PrivateLayout from "./components/layout/PrivateLayout";
import PublicLayout from "./components/layout/PublicLayout";
import Home from "./pages/Home";
import CategoryList from "./pages/Category/CategoryList";
import PostList from "./pages/Post/PostList";
import Setting from "./pages/Setting";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />}>
            Home
          </Route>
          <Route path="categories" element={<CategoryList />}>
            Categories
          </Route>
          <Route path="posts" element={<PostList />}>
            Posts
          </Route>
          <Route path="profile" element={<PostList />}>
            Profile
          </Route>
          <Route path="setting" element={<Setting />}>
            Setting
          </Route>
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/signup" element={<Signup />}>
            Singup
          </Route>
          <Route path="/login" element={<Login />}>
            Login
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
