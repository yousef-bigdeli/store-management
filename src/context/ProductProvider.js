import { createContext, useContext, useReducer } from "react";
import {
  getAllProducts,
  setNewProduct,
  deleteProduct,
  updateProduct,
} from "../services/ProductActions";

const initialState = {
  products: getAllProducts(),
  editId: 0,
};

const ProductContext = createContext();
const ProductContextDispatcher = createContext();

const reducer = (state, { type, data }) => {
  switch (type) {
    case "setProduct": {
      const newId =
        state.products.reduce(
          (maxId, item) => (maxId > item.id ? maxId : item.id),
          0
        ) + 1;
      setNewProduct([
        ...state.products,
        { id: newId, ...data, category: data.category.value },
      ]);
      return { ...state, products: getAllProducts() };
    }

    case "deleteProduct": {
      deleteProduct(data.id);
      return { ...state, products: getAllProducts() };
    }

    case "setEditId": {
      // To put an item into the product form when the user wants to edit it (set product id in the state)
      return { ...state, editId: data.id };
    }

    case "editProduct": {
      updateProduct({ ...data, category: data.category.value });
      return { products: getAllProducts(), editId: 0 };
    }

    case "search": {
      return {
        ...state,
        products: getAllProducts().filter((item) =>
          item.name.toLowerCase().includes(data.title.toLowerCase())
        ),
      };
    }

    default:
      return state;
  }
};

const ProductProvider = ({ children }) => {
  const [product, dispatcher] = useReducer(reducer, initialState);

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
