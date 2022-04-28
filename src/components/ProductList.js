import { useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Milk", category: "dairy" },
  ]);

  return ( 
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
