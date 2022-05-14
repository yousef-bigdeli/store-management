import http from "./httpServices";

const getProducts = () => {
  return http.get("./products");
};
const addProduct = (data) => {
  return http.post("./products", data);
};
const updateProduct = (id, data) => {
  return http.put(`./products/${id}`, data);
};
const deleteProduct = (id) => {
  return http.put(`./products/${id}`);
};

export { getProducts, addProduct, updateProduct, deleteProduct };
