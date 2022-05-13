import http from "./httpServices";

const getCategories = () => {
  return http.get("/categories");
};

const addNewCategory = (data) => {
  return http.post("/categories", data);
};

const updateCategory = (id, data) => {
  return http.put(`/categories/${id}`, data);
};

const deleteCategory = (id) => {
  return http.delete(`/categories/${id}`);
};

export { getCategories, addNewCategory, updateCategory, deleteCategory };
