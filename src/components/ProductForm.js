import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";
import CategoryForm from "./CategoryForm/CategoryForm";
import { useProduct, useProductDispatcher } from "../context/ProductProvider";
import { getCategories } from "../services/categoryActions";
import { getProductById } from "../services/productActions";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  quantity: 0,
  category: "",
};

const ProductForm = () => {
  const [editValues, setEditValues] = useState(null);
  const formik = useFormik({
    initialValues: editValues || initialValues,
    enableReinitialize: true,
  });
  const [isShowModal, setIsShowModal] = useState(false); // Show category form in a modal window
  const [options, setOptions] = useState(null);
  const productEditId = useProduct().editId;
  const nameInputRef = useRef();
  const productDispatch = useProductDispatcher();
  const showModalHandler = () => {
    setIsShowModal((prevState) => !prevState);
  };

  const selectValueHandler = (options, value) => {
    return options && value
      ? options.find((item) => item.value === value)
      : null;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const action = productEditId
      ? { type: "editProduct", data: { ...formik.values, id: productEditId } }
      : { type: "addProduct", data: { ...formik.values } };
    productDispatch(action);
    setEditValues(null);
    formik.resetForm();
  };

  // Get all categories from DB
  useEffect(() => {
    getCategories()
      .then(({ data }) =>
        setOptions(
          data.map((item) => ({ value: item.title, label: item.title }))
        )
      )
      .catch((err) => console.log(err));
  }, [isShowModal]);

  useEffect(() => {
    if (productEditId > 0) {
      getProductById(productEditId)
        .then(({ data }) => {
          setEditValues(data);
        })
        .catch((err) => console.log(err));
    }
  }, [productEditId]);

  return (
    <section className="flex-column">
      <h2>Add new product</h2>
      <form className="product-form" onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.name}
          ref={nameInputRef}
        />
        <label htmlFor="cat">category</label>
        <div className="category">
          <Select
            value={selectValueHandler(options, formik.values.category)}
            onChange={(selectedOption) =>
              formik.setFieldValue("category", selectedOption.value)
            }
            options={options}
            id="cat"
            className="category__select"
          />
          {/* Button for show modal */}
          <button
            className="add-btn"
            type="button"
            onClick={() => setIsShowModal(true)}
          >
            <AiFillPlusCircle />
          </button>
        </div>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.quantity}
        />
        <button type="submit" className="submit-btn">
          {productEditId ? "Update prodcut" : "Add product"}
        </button>
        {productEditId > 0 && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              productDispatch({ type: "setEditId", data: { id: 0 } });
              setEditValues(null);
            }}
            style={{ width: "90%", marginTop: "8px" }}
          >
            Cancel
          </button>
        )}
      </form>
      {isShowModal && (
        <CategoryForm
          isShowModal={isShowModal}
          showModalHandler={showModalHandler}
        />
      )}
    </section>
  );
};

export default ProductForm;
