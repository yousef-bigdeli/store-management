import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";
import CategoryForm from "./CategoryForm/CategoryForm";
import { useProduct, useProductDispatcher } from "../context/ProductProvider";
import { getCategories } from "../services/categoryActions";
import { getProductById } from "../services/productActions";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  quantity: "",
  category: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Enter name"),
  category: Yup.string().required("Select category"),
  quantity: Yup.number().required("Add quantity"),
});

const ProductForm = () => {
  const [editValues, setEditValues] = useState(null);
  const formik = useFormik({
    initialValues: editValues || initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
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
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        const action = productEditId
          ? {
              type: "editProduct",
              data: { ...formik.values, id: productEditId },
            }
          : { type: "addProduct", data: { ...formik.values } };
        productDispatch(action);
        formik.setSubmitting(false);
        setEditValues(null);
        formik.resetForm();
      }
    });
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
          onBlur={formik.handleBlur}
          ref={nameInputRef}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="field-error">{formik.errors.name}</div>
        )}
        <label htmlFor="cat">category</label>
        <div className="category">
          <Select
            value={selectValueHandler(options, formik.values.category)}
            onChange={(selectedOption) =>
              formik.setFieldValue("category", selectedOption.value)
            }
            onBlur={() =>
              formik.setTouched({ ...formik.touched, category: true })
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
        {formik.touched.category && formik.errors.category && (
          <div className="field-error">{formik.errors.category}</div>
        )}
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.quantity}
          onBlur={formik.handleBlur}
        />
        {formik.touched.quantity && formik.errors.quantity && (
          <div className="field-error">{formik.errors.quantity}</div>
        )}
        <button type="submit" className="submit-btn" disabled={!formik.isValid}>
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
