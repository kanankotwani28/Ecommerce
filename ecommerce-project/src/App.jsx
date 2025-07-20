import { HomePage } from './pages/HomePage'
import { Routes , Route, BrowserRouter} from 'react-router-dom'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage />}/>
    </Routes>
    </BrowserRouter>
  );
}
export default App
