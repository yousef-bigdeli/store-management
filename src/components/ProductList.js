import { useProduct, useProductDispatcher } from "../context/ProductProvider";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import SearchProducts from "./SearchProducts";

const ProductList = () => {
  const products = useProduct().products;
  const productDispatch = useProductDispatcher();

  const productChangesHandler = (e, id) => {
    const action = { type: e.currentTarget.id, data: { id } };
    productDispatch(action);
  };

  return (
    <section className="flex-column">
      <h2>Product List</h2>
      <SearchProducts />
      {/* TODO: Add sort and filter by category */}
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
                <button
                  className="product-table__btn edit"
                  id="setEditId"
                  onClick={(e) => productChangesHandler(e, item.id)}
                >
                  <AiFillEdit />
                </button>
                <button
                  className="product-table__btn delete"
                  id="deleteProduct"
                  onClick={(e) => productChangesHandler(e, item.id)}
                >
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
