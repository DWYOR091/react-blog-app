import { useNavigate, useParams } from "react-router-dom";
import langit from "../../assets/images/langit.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { Slide, toast } from "react-toastify";
import { urlImage } from "../../utils/urlImage";

const DetailPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  //modal
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleDeletePost = async () => {
    try {
      setLoadingDelete(true);
      const res = await axiosInstance.delete("post/" + id);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });
      navigate("/posts");
      setLoadingDelete(false);
    } catch (error) {
      setLoadingDelete(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const getOnePost = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`post/${id}`);
        // console.log(response.data.data.post);
        setPost(response.data.data.post);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getOnePost();
  }, [id]);
  return loading || !post ? (
    <h1 className="mt-5 text-center">Loading ...</h1>
  ) : (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <button
        className="d-block btn btn-primary"
        onClick={() => navigate(`/posts/detailPost/updatePost/${id}`)}
      >
        Update
      </button>
      <button className="d-block btn btn-danger mt-3" onClick={handleShow}>
        Delete
      </button>
      <div className="mx-5 mt-5">
        <h1 className="text-center fw-bold text-decoration-underline">
          {post.title}
        </h1>
        <p className="fw-bold">Category: {post.category?.title || ""}</p>
        <p className="fw-bold">
          Created At: {moment(post.createdAt).subtract(10, "days").calendar()}
        </p>
        <p className="fw-bold">
          Updated At: {moment(post.updatedAt).subtract(10, "days").calendar()}
        </p>
        <p>
          {post.desc} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dolorem minus harum, voluptatibus pariatur explicabo voluptates
          perspiciatis expedita ratione rem, fugit temporibus sequi accusamus
          obcaecati, consequatur molestiae amet quos asperiores culpa.
          Reiciendis quas aspernatur perferendis doloremque! Quasi, nisi ipsa
          quae iste veritatis numquam repellat nemo similique perferendis,
          suscipit, minus earum dolor!
        </p>
        <img src={post.file?.url || langit} alt="" className="img-fluid" />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete this post?</Modal.Body>
        <Modal.Footer>
          {loadingDelete ? (
            <button className="btn btn-danger" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status"> deleting... </span>
            </button>
          ) : (
            <>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button variant="danger" onClick={() => handleDeletePost()}>
                Yes
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailPost;
