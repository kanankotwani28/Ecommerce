import { HomePage } from './pages/HomePage'
import { Routes , Route, BrowserRouter} from 'react-router-dom'
import { CheckoutPage } from './pages/CheckoutPage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" 
        element={<HomePage />}>
      </Route>
      <Route path="checkout.html"
        element={<CheckoutPage />}>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App
