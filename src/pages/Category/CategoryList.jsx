import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import { Slide, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const CategoryList = () => {
  //boostrap
  const [selectedIdCategory, setSelectedIdCategory] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSelectedIdCategory(null);
  };
  const handleShow = (id) => {
    setShow(true);
    setSelectedIdCategory(id);
  };

  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const size = 5;

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `category?q=${search}&page=${currentPage}&size=${size}`
      );
      const data = res.data.data;

      setDatas(data.categories);
      setTotalPage(data.pages);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });
    }
  }, [currentPage, search]);

  const handleDeleteCategory = async () => {
    try {
      const res = await axiosInstance.delete(`category/${selectedIdCategory}`);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });
      handleClose();
      fetchCategories();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Slide,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // reset ke page 1 saat search baru
  };

  const handleNewCategory = () => {
    navigate("/categories/newCategory");
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const numberStart = (currentPage - 1) * size;

  return (
    <div className="container mt-2">
      <button className="btn btn-primary my-3" onClick={handleNewCategory}>
        Add new category
      </button>
      <h3 className="text-md-center text-center my-5 fw-bold">Category List</h3>

      <form>
        Search <input type="text" value={search} onChange={handleSearch} />
      </form>

      {loading ? (
        "loading ..."
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={data._id}>
                  <td>{numberStart + index + 1}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>
                    {moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td>
                    {moment(data.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => navigate(`update/${data._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleShow(data._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={() => handleDeleteCategory()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryList;
