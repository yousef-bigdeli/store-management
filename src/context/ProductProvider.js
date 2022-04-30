import { createContext, useContext, useReducer, useState } from "react";
import {
  getAllProducts,
  setNewProduct,
  deleteProduct,
  updateProduct,
} from "../services/ProductActions";

const productsData = getAllProducts();

const ProductContext = createContext();
const ProductContextDispatcher = createContext();
const ProductEditContext = createContext();
const ProductSetEditContext = createContext();

const reducer = (products, { type, data }) => {
  const allProducts = [...productsData];

  switch (type) {
    case "setProduct": {
      const id =
        products.reduce(
          (maxId, item) => (maxId > item.id ? maxId : item.id),
          0
        ) + 1;
      const newProduct = { id, ...data };
      allProducts.push(newProduct);
      setNewProduct(allProducts);
      return getAllProducts();
    }
    case "deleteProduct": {
      deleteProduct(data.id);
      return getAllProducts();
    }
    case "editProduct": {
      updateProduct(data);
      return getAllProducts();
    }

    default:
      return products;
  }
};

const ProductProvider = ({ children }) => {
  const [product, dispatcher] = useReducer(reducer, productsData);
  const [editId, setEditId] = useState(0);
  return (
    <ProductContext.Provider value={product}>
      <ProductContextDispatcher.Provider value={dispatcher}>
        <ProductEditContext.Provider value={editId}>
          <ProductSetEditContext.Provider value={setEditId}>
            {children}
          </ProductSetEditContext.Provider>
        </ProductEditContext.Provider>
      </ProductContextDispatcher.Provider>
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useProduct = () => useContext(ProductContext);
export const useProductDispatcher = () => useContext(ProductContextDispatcher);
export const useProductEdit = () => useContext(ProductEditContext);
export const useProductSetEdit = () => useContext(ProductSetEditContext);

