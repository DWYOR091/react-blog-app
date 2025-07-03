import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import moment from "moment";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const size = 3;

  useEffect(() => {
    const getDataPost = async () => {
      try {
        setloading(true);
        const response = await axios.get(
          `post?title=${searchTitle}&size=${size}&page=${currentPage}`
        );
        setPosts(response.data.data.posts);
        setTotalPage(response.data.pages);
        setloading(false);
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };
    getDataPost();
  }, [currentPage, searchTitle]);

  const handleSearch = (e) => {
    setSearchTitle(e.target.value);
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const numberStart = (currentPage - 1) * size;
  return (
    <div className="container">
      <button className="btn btn-primary my-3">Add New Post</button>
      <h2 className="text-center my-5">Post List</h2>
      search <input type="text" className="mb-3" onChange={handleSearch} />
      <br />
      {loading ? (
        "loading..."
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Desc</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              return (
                <tr key={post._id}>
                  <td>{numberStart + index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.desc}</td>
                  <td>{post.category?.title || ""}</td>
                  <td>
                    {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td>
                    {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td>
                    <button className="btn btn-warning mx-2">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {totalPage > 0 ? (
        <div className="">
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="mx-3">
            Page {currentPage} of {totalPage}
          </span>
          <button
            className="btn btn-secondary"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            Next
          </button>
        </div>
      ) : (
        <p className="text-center fw-bold h4 mt-5">Data not found</p>
      )}
    </div>
  );
};

export default PostList;
