import { createContext, useContext, useEffect, useReducer } from "react";

let isSearch = false; // To prevent store in localstorage when searching
const initialState = {
  data: [],
  editId: 0,
};
const ProductContext = createContext();
const ProductContextDispatcher = createContext();
const getAllData = () => {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
};

const reducer = (state, { type, data }) => {
  isSearch = false;
  switch (type) {
    case "updateStateValue": {
      return { data, editId: 0 };
    }

    case "addProduct": {
      const newId =
        state.data.reduce(
          (maxId, item) => (maxId > item.id ? maxId : item.id),
          0
        ) + 1;
      return {
        data: [
          ...state.data,
          { id: newId, ...data, category: data.category.value },
        ],
        editId: 0,
      };
    }

    case "deleteProduct": {
      return {
        data: state.data.filter((item) => item.id !== data.id),
        editId: 0,
      };
    }

    case "setEditId": {
      // To put an item into the product form when the user wants to edit it (set product id in the state)
      return { ...state, editId: data.id };
    }

    case "editProduct": {
      return {
        data: state.data.map((item) =>
          item.id === data.id
            ? { ...data, category: data.category.value }
            : item
        ),
        editId: 0,
      };
    }

    case "search": {
      isSearch = true;
      return {
        ...state,
        data: getAllData().filter((item) =>
          item.name.toLowerCase().includes(data.title.toLowerCase())
        ),
      };
    }

    default:
      return state;
  }
};

const ProductProvider = ({ children }) => {
  const [products, dispatcher] = useReducer(reducer, initialState);

  // Read From localStorage
  useEffect(() => {
    dispatcher({ type: "updateStateValue", data: getAllData() });
  }, []);
  // Write to localstorage
  useEffect(() => {
    if (!isSearch)
      localStorage.setItem("products", JSON.stringify(products.data));
  }, [products.data]);

  return (
    <ProductContext.Provider value={products}>
      <ProductContextDispatcher.Provider value={dispatcher}>
        {children}
      </ProductContextDispatcher.Provider>
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useProduct = () => useContext(ProductContext);
export const useProductDispatcher = () => useContext(ProductContextDispatcher);
