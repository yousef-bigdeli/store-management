import { useEffect, useState, useRef } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineClose } from "react-icons/ai";
import {
  addNewCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../services/categoryActions";
import "./CategoryForm.css";

const CategoryForm = ({ isShowModal, showModalHandler }) => {
  const [categories, setCategories] = useState({
    data: [],
    editId: 0,
  });
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  // Category form handler for Add new one and update them
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (categories.editId) {
      updateCategory(categories.editId, { title })
        .then(({ data }) =>
          setCategories({
            editId: 0,
            data: categories.data.map((item) =>
              item.id === data.id ? data : item
            ),
          })
        )
        .catch((err) => console.log(err));
    } else {
      if (title) {
        addNewCategory({ title })
          .then(({ data }) =>
            setCategories({
              editId: 0,
              data: [...categories.data, data],
            })
          )
          .catch((err) => console.log(err));
      }
    }
    setTitle("");
  };

  // Delete item handler
  const deleteCategoryHandler = (id) => {
    deleteCategory(id)
      .then(() =>
        setCategories({
          editId: 0,
          data: categories.data.filter((item) => item.id !== id),
        })
      )
      .catch((err) => console.log(err));
  };

  // Reading all from DB
  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories({ data, editId: 0 }))
      .catch((err) => console.log(err));
  }, []);

  // When user press ESC key, modal hide
  const keyDownHandler = (e) => {
    if ((e.keyCode || e.charCode) === 27) {
      showModalHandler();
    }
  };
  useEffect(() => {
    document.body.addEventListener("keydown", keyDownHandler);
    return () => {
      document.body.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <div
      className="modal"
      onClick={(e) =>
        e.target.classList.contains("modal") && showModalHandler()
      }
    >
      <div
        className={`modal-content ${isShowModal ? "show" : ""}`}
        onCanPlay={(e) => e.stopPropagation()}
      >
        {/* New category form */}
        <button className="close-modal" onClick={() => showModalHandler()}>
          <AiOutlineClose />
        </button>
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
              {categories.editId ? "Update" : "Add"}
            </button>
            {categories.editId > 0 && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setTitle("");
                  setCategories({ ...categories, editId: 0 });
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
              {categories.data.map(({ title, id }, index) => (
                <tr className="product-table__body" key={id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>
                    <button
                      className="product-table__btn edit"
                      onClick={() => {
                        setCategories({ ...categories, editId: id });
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
