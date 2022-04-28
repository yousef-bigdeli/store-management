import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import ProductProvider from "../context/ProductProvider";
import "./StoreManagmentApp.css";

const StoreManagementApp = () => {
  return (
    <main className="container">
      <ProductProvider>
        <ProductForm />
        <ProductList />
      </ProductProvider>
    </main>
  );
};

export default StoreManagementApp;
