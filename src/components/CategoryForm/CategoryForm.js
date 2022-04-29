import { useEffect, useState, useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
  getAllCategories,
  setNewCategory,
  deleteCategory,
  updateCategory,
} from "../../services/CategoryActions";
import "./CategoryForm.css";

const CategoryForm = ({ isShowModal, handleModal }) => {
  const [categories, setCategories] = useState(getAllCategories()); // for show on list
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState({ isEdit: false, id: 0 });
  const inputRef = useRef();

  // When user press ESC key, modal hide
  const keyDownHandler = (e) => {
    if ((e.keyCode || e.charCode) === 27) {
      handleModal();
    }
  };

  // close modal after clicking out
  useEffect(() => {
    document.body.addEventListener("keydown", keyDownHandler);

    return () => {
      document.body.removeEventListener("keydown", keyDownHandler);
    };
  });

  // Category form handler for Add new one and update them
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (editMode.isEdit) {
      updateCategory(editMode.id, title);
    } else {
      if (title) {
        const id =
          categories.reduce(
            (maxId, item) => (maxId > item.id ? maxId : item.id),
            0
          ) + 1;
        setNewCategory({ id, title });
      }
    }

    setTitle("");
    setEditMode({ isEdit: false, id: 0 });
    setCategories(getAllCategories());
  };

  // Delete
  const deleteCategoryHandler = (id) => {
    deleteCategory(id);
    setCategories(getAllCategories());
  };

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
          <form className="category-form" onSubmit={formSubmitHandler}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={inputRef}
            />
            <button type="submit" className="submit-btn">
              {editMode.isEdit ? "Update" : "Add"}
            </button>
            {editMode.isEdit && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setTitle("");
                  setEditMode({ isEdit: false, id: 0 });
                }}
              >
                Cancel
              </button>
            )}
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
                <tr className="product-table__body" key={id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>
                    <button
                      className="product-table__btn edit"
                      onClick={() => {
                        setEditMode({ isEdit: true, id });
                        setTitle(title);
                        inputRef.current.focus();
                      }}
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      className="product-table__btn delete"
                      onClick={() => deleteCategoryHandler(id)}
                    >
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
