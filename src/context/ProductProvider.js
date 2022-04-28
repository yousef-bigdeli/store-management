import { createContext, useContext, useReducer } from "react";

const productsData = [{ id: 1, name: "Milk", category: "dairy" }];

const ProductContext = createContext();
const ProductContextDispatcher = createContext();

const reducer = (product, action) => {
  return product;
};

const ProductProvider = ({ children }) => {
  const [product, dispatcher] = useReducer(reducer, productsData);
  return (
    <ProductContext.Provider value={product}>
      <ProductContextDispatcher.Provider value={dispatcher}>
        {children}
      </ProductContextDispatcher.Provider>
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useProduct = () => useContext(ProductContext);
export const useProductDispatcher = () => useContext(ProductContextDispatcher);
