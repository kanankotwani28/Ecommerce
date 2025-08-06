import { HomePage } from "./pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";
import "./App.css";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async() =>{
       const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
      };

  useEffect(() => {
    loadCart();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  );
}
export default App;
