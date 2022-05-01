import { useState } from "react";
import { useProductDispatcher } from "../context/ProductProvider";

const SearchProducts = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatcher = useProductDispatcher();

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    dispatcher({ type: "search", data: { title: e.target.value } });
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search somthing..."
        value={searchValue}
        onChange={searchHandler}
        className="form-input search-input"
      />
    </div>
  );
};

export default SearchProducts;
