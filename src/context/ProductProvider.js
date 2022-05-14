import { createContext, useContext, useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productActions";

const ProductContext = createContext();
const ProductContextDispatcher = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({
    data: [],
    editId: 0,
  });
  const [allProducts, setAllProducts] = useState([]); // Use for search

  const dispatcher = ({ type, data }) => {
    switch (type) {
      case "addProduct": {
        addProduct({ ...data, category: data.category.value })
          .then(({ data }) => {
            setProducts((prevState) => ({
              editId: 0,
              data: [...prevState.data, data],
            }));
            setAllProducts([...products.data, data]);
          })
          .catch((err) => console.log(err));
        break;
      }

      case "deleteProduct": {
        deleteProduct(data.id)
          .then(() => {
            setProducts((prevState) => ({
              editId: 0,
              data: prevState.data.filter((item) => item.id !== data.id),
            }));
            setAllProducts(products.data.filter((item) => item.id !== data.id));
          })
          .catch((err) => console.log(err));
        break;
      }

      case "setEditId": {
        // To put an item into the product form when the user wants to edit it (set product id in the state)
        setProducts((prevState) => ({ ...prevState, editId: data.id }));
        break;
      }

      case "editProduct": {
        const { name, quantity, category, id } = data;
        updateProduct(products.editId, {
          name,
          quantity,
          category: category.value,
        })
          .then(({ data }) => {
            setProducts((prevState) => ({
              editId: 0,
              data: prevState.data.map((item) =>
                item.id === id ? data : item
              ),
            }));
            setAllProducts(
              products.data.map((item) => (item.id === id ? data : item))
            );
          })
          .catch((err) => console.log(err));
        break;
      }

      case "search": {
        const { title: searchValue } = data;
        setProducts({
          editId: 0,
          data: allProducts.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          ),
        });
        break;
      }

      default:
        return products;
    }
  };
  
  // Read From localStorage
  useEffect(() => {
    getProducts()
      .then(({ data }) => {
        setProducts({ editId: 0, data });
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
