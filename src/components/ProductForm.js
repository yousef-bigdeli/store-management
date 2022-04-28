import { useState } from "react";
import Select from "react-select";
import { AiFillPlusCircle } from "react-icons/ai";

const options = [{ value: "dairy", label: "dairy" }];

const ProductForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectValue) => {
    setSelectedOption(selectValue);
  };

  return (
    <section className="flex-column">
      <h2>Add new product</h2>
      <form className="product-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="cat">category</label>
        <div className="category">
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            id="cat"
            className='category__select'
          />
          <button className='add-btn' type='button'>
            <AiFillPlusCircle />
          </button>
        </div>
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" />
        <button type="submit" className='submit-btn'>Add Product</button>
      </form>
    </section>
  );
};

export default ProductForm;
