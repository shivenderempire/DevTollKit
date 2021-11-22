import { useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_Products = [
  {
    id: "p1",
    price: 6,
    title: "My First Book",
    description: "My First Book i have ever Wrote",
  },
  {
    id: "p2",
    price: 5,
    title: "My Second Book",
    description: "My Second Book i have ever Wrote",
  },
  {
    id: "p3",
    price: 4,
    title: "My Third Book",
    description: "My Third Book i have ever Wrote",
  },
];
const Products = (props) => {
  const [ProductList, setProductList] = useState(DUMMY_Products);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {ProductList.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
