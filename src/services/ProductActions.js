// check out the products from local storage
const getAllProducts = () => {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
};

const setNewProduct = (data) => {
  localStorage.setItem("products", JSON.stringify(data));
};

const deleteProduct = (id) => {
  const products = getAllProducts().filter((item) => item.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
};

const updateProduct = (data) => {
  console.log(data);
  const products = getAllProducts().map((item) =>
    item.id === data.id ? data : item
  );
  localStorage.setItem("products", JSON.stringify(products));
};

const getProductById = (id) => {
  return getAllProducts().filter((item) => item.id === id);
};

export {
  getAllProducts,
  setNewProduct,
  deleteProduct,
  updateProduct,
  getProductById,
};
