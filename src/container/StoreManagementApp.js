import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import ProductProvider from "../context/ProductProvider";
import "./StoreManagmentApp.css";

const StoreManagementApp = () => {
  return (
    <div className="container">
      <ProductProvider>
        <ProductForm />
        <ProductList />
      </ProductProvider>
    </div>
  );
};

export default StoreManagementApp;
