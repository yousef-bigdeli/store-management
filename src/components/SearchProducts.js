import { useState } from "react";

const SearchProducts = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className='search-wrapper'>
      <input
        type="text"
        placeholder="Search somthing..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className='form-input search-input'
      />
    </div>
  );
};

export default SearchProducts;
