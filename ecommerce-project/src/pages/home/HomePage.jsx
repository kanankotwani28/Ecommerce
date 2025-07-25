import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../assets/Header";
import { ProductsGrid } from "./ProductsGrid";
// import { products } from "../../starting-code/data/products.js";
import "./HomePage.css";
export function HomePage({ cart }) {
  // fetch('http://localhost:3000/api/products').then((response)=>{
  //   // console.log(response)
  //   response.json().then((data)=>{
  //     console.log(data)
  //   });
  // });

  // fetch('http://localhost:3000/api/products').then((response) =>{
  //   return response.json()
  // }).then((data)=>{
  //   console.log(data);
  // });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      // console.log(response.data);
      setProducts(response.data);
    });

    //Generate the Cart Quantity
    // axios.get('http://localhost:3000/api/cart-items')
    //   .then((response)=>{
    //       setCart(response.data)
    //   });
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products}/>
      </div>
    </>
  );
}
