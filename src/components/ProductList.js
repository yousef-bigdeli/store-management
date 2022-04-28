import { useProduct } from "../context/ProductProvider";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ProductList = () => {
  const products = useProduct();

  return (
    <section className="flex-column">
      <h2>Product List</h2>
      <table className="product-table">
        <thead>
          <tr className="product-table__head">
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item.id} className="product-table__body">
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button className="product-table__btn edit">
                  <AiFillEdit />
                </button>
                <button className="product-table__btn delete">
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProductList;
