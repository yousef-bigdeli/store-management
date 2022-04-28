import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const StoreManagementApp = () => {
  return ( 
    <div className='container'>
      <ProductForm />
      <ProductList />
    </div>
   );
}
 
export default StoreManagementApp;