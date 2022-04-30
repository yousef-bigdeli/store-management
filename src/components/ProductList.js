import {
  useProduct,
  useProductDispatcher,
  useProductSetEdit,
} from "../context/ProductProvider";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ProductList = () => {
  const products = useProduct();
  const productDispatch = useProductDispatcher();
  const setEditId = useProductSetEdit();

  const deleteHandler = (id) => {
    const data = { id };
    const action = { type: "deleteProduct", data };
    productDispatch(action);
  };

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
                <button
                  className="product-table__btn edit"
                  onClick={() => setEditId(item.id)}
                >
                  <AiFillEdit />
                </button>
                <button
                  className="product-table__btn delete"
                  onClick={() => deleteHandler(item.id)}
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
