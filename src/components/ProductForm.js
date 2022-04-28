import { useState } from "react";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";
import CategoryForm from "./CategoryForm/CategoryForm";

const options = [{ value: "dairy", label: "dairy" }];

const ProductForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleChange = (selectValue) => {
    setSelectedOption(selectValue);
  };

  const handleModal = () => {
    setIsShowModal((prevState) => !prevState);
  };

  return (
    <section className="flex-column">
      <h2>Add new product</h2>
      <form className="product-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className='form-input'/>
        <label htmlFor="cat">category</label>
        <div className="category">
          <Select
            value={selectedOption}
            onChange={handleChange}
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
        <input type="number" id="quantity" className='form-input'/>
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
