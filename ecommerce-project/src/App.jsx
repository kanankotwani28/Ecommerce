import { HomePage } from './pages/HomePage'
import { Routes , Route, BrowserRouter} from 'react-router-dom'
import {useEffect,useState} from 'react';
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'
import axios from 'axios';

function App() {
  const [cart,setCart]= useState([]);
  useEffect(()=>{
      axios.get('http://localhost:3000/api/cart-items')
      .then((response)=>{
        setCart(response.data)
    }); 
  },[]);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage />}/>
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
    </BrowserRouter>
  );
}
export default App
