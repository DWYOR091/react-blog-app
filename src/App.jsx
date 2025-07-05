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
import NewCategory from "./pages/Category/NewCategory";
import UpdateCategory from "./pages/Category/UpdateCategory";
import Profile from "./pages/Profile";
import NewPost from "./pages/Post/NewPost";
import DetailPost from "./pages/Post/DetailPost";
import UpdatePost from "./pages/Post/UpdatePost";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/newCategory" element={<NewCategory />} />
          <Route path="categories/update/:id" element={<UpdateCategory />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/newPost" element={<NewPost />} />
          <Route path="posts/detailPost/:id" element={<DetailPost />} />
          <Route
            path="posts/detailPost/updatePost/:id"
            element={<UpdatePost />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
