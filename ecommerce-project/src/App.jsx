import { HomePage } from './pages/HomePage'
import { Routes , Route} from 'react-router-dom'
import {useEffect,useState} from 'react';
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'
import axios from 'axios';

function App() {
  const [cart,setCart]= useState([]);
  useEffect(()=>{
      axios.get('/api/cart-items?expand=product')
      .then((response)=>{
        setCart(response.data)
    }); 
  },[]);
  return (
    
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage />}/>
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
    
  );
}
export default App
