import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./CategoryForm.css";

const CategoryForm = ({ isShowModal, handleModal }) => {
  const [categories, setCategories] = useState([{ id: 1, title: "dairy" }]);

  const keyDownHandler = (e) => {
    if ((e.keyCode || e.charCode) === 27) {
      handleModal();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", keyDownHandler);

    return () => {
      document.body.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div
      className="modal"
      onClick={(e) => e.target.classList.contains("modal") && handleModal()}
    >
      <div
        className={`modal-content ${isShowModal ? "show" : ""}`}
        onCanPlay={(e) => e.stopPropagation()}
      >
        {/* New category form */}
        <div className="modal-header">
          <h3>Add new category</h3>
        </div>
        <div className="modal-body">
          <form className="category-form">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="form-input" />
            <button type="submit" className="submit-btn">
              Add
            </button>
          </form>
        </div>
        {/* Preview Category list */}
        <div className="modal-header">
          <h3>Category List</h3>
        </div>
        <div className="modal-body">
          <table className="product-table">
            <thead>
              <tr className="product-table__head">
                <th>#</th>
                <th>Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map(({ title, id }, index) => (
                <tr className="product-table__body">
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>
                    <button className="product-table__btn edit">
                      <AiFillEdit />
                    </button>
                    <button className="product-table__btn delete">
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
