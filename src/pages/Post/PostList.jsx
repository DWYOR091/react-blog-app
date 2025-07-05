import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import langit from "../../assets/images/langit.png";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const size = 6;
  const navigate = useNavigate();

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
  return (
    <div className="container">
      <button
        className="btn btn-primary my-3"
        onClick={() => navigate("/posts/newPost")}
      >
        Add New Post
      </button>
      <h2 className="text-center my-5">Post List</h2>
      search <input type="text" className="mb-3" onChange={handleSearch} />
      <br />
      {loading ? (
        <h1 className="mt-5 text-center">Loading ...</h1>
      ) : totalPage > 0 ? (
        <>
          <div className="mt-3 mb-3 d-flex flex-wrap justify-content-around">
            {posts.map((p) => {
              return (
                <div
                  className="card my-3"
                  style={{ width: "18rem" }}
                  key={p._id}
                  onClick={() => navigate(`detailPost/${p._id}`)}
                >
                  <img src={langit} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
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
        </>
      ) : (
        <p className="text-center fw-bold h4 mt-5">Data not found</p>
      )}
    </div>
  );
};

export default PostList;
