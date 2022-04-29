const getAllCategories = () => {
  return localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories"))
    : [];
};

const setNewCategory = (data) => {
  const categories = getStorage();
  categories.push(data);
  localStorage.setItem("categories", JSON.stringify(categories));
};

const deleteCategory = (id) => {
  const categories = getStorage().filter((item) => item.id !== id);
  localStorage.setItem("categories", JSON.stringify(categories));
};

const updateCategory = (id, title) => {
  const categories = getStorage().map((item) =>
    item.id === id ? { ...item, title } : item
  );
  localStorage.setItem("categories", JSON.stringify(categories));
};

export { getAllCategories, setNewCategory, deleteCategory, updateCategory };

// check out the categories from local storage
const getStorage = () => {
  return localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories"))
    : [];
};
