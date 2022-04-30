import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";
import CategoryForm from "./CategoryForm/CategoryForm";
import { getAllCategoryOptions } from "../services/CategoryActions";
import {
  useProductDispatcher,
  useProductEdit,
  useProductSetEdit,
} from "../context/ProductProvider";
import { getProductById } from "../services/ProductActions";

const ProductForm = () => {
  const [product, setProduct] = useState({ name: "", quantity: 0 });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [options, setOptions] = useState(getAllCategoryOptions());
  const productDispatch = useProductDispatcher();
  const editId = useProductEdit();
  const setEditId = useProductSetEdit();
  const nameRef = useRef();

  const handleInputChanges = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChanges = (selectedValue) => {
    setSelectedOption(selectedValue);
  };

  const handleModal = () => {
    setIsShowModal((prevState) => !prevState);
    setOptions(getAllCategoryOptions());
  };

  const productSubmitHandler = (e) => {
    e.preventDefault();
    const data =
      editId > 0
        ? { ...product, category: selectedOption.value, id: editId }
        : { ...product, category: selectedOption.value };
    let action =
      editId > 0 ? { type: "editProduct", data } : { type: "setProduct", data };
    productDispatch(action);
    setProduct({ name: "", quantity: 0 });
    setSelectedOption(null);
    setEditId(0);
    nameRef.current.focus();
  };

  useEffect(() => {
    if (editId > 0) {
      const data = getProductById(editId)[0];
      setProduct({ name: data.name, quantity: data.quantity });
      setSelectedOption({ value: data.category, label: data.category });
    }
  }, [editId]);

  return (
    <section className="flex-column">
      <h2>Add new product</h2>
      <form className="product-form" onSubmit={productSubmitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          onChange={(e) => handleInputChanges(e)}
          value={product.name}
          ref={nameRef}
        />
        <label htmlFor="cat">category</label>
        <div className="category">
          <Select
            value={selectedOption}
            onChange={handleSelectChanges}
            options={options}
            id="cat"
            className="category__select"
          />
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
          onChange={(e) => handleInputChanges(e)}
          value={product.quantity}
        />
        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
      {isShowModal && (
        <CategoryForm isShowModal={isShowModal} handleModal={handleModal} />
      )}
    </section>
  );
};

export default ProductForm;
