import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";
import CategoryForm from "./CategoryForm/CategoryForm";
import { useProduct, useProductDispatcher } from "../context/ProductProvider";
import { getCategories } from "../services/categoryActions";

const initialProduct = {
  name: "",
  quantity: 0,
  category: { value: "", label: "" },
};
const getProductById = (id) => {
  const data = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  return data.find((item) => item.id === id);
};

const ProductForm = () => {
  const [product, setProduct] = useState(initialProduct);
  const [isShowModal, setIsShowModal] = useState(false); // Show category form in a modal window
  const [options, setOptions] = useState(null); // Get From localstorage
  const productEditId = useProduct().editId;
  const productDispatch = useProductDispatcher();
  const nameInputRef = useRef();

  const changeInputHandler = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeSelectHandler = (selectedValue) => {
    setProduct({ ...product, category: selectedValue });
  };

  const showModalHandler = () => {
    setIsShowModal((prevState) => !prevState);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const action = productEditId
      ? { type: "editProduct", data: { ...product, id: productEditId } }
      : { type: "addProduct", data: { ...product } };
    productDispatch(action);
    setProduct(initialProduct);
    nameInputRef.current.focus();
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
      const { name, quantity, category } = getProductById(productEditId);
      setProduct({
        name: name,
        quantity: quantity,
        category: { value: category, label: category },
      });
    }
  }, [productEditId]);

  return (
    <section className="flex-column">
      <h2>Add new product</h2>
      <form className="product-form" onSubmit={formSubmitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          onChange={(e) => changeInputHandler(e)}
          value={product.name}
          ref={nameInputRef}
        />
        <label htmlFor="cat">category</label>
        <div className="category">
          <Select
            value={product.category}
            onChange={changeSelectHandler}
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
          onChange={(e) => changeInputHandler(e)}
          value={product.quantity}
        />
        <button type="submit" className="submit-btn">
          {productEditId ? "Update prodcut" : "Add product"}
        </button>
        {productEditId > 0 && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setProduct(initialProduct);
              productDispatch({ type: "setEditId", data: { id: 0 } });
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
