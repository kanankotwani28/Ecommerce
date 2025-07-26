
import axios from "axios";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";


export function CheckoutPage({ cart , loadCart}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch delivery options:", err);
      });

    axios
      .get("/api/payment-summary")
      .then((response) => {
        setPaymentSummary(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch delivery options:", err);
      });
  }, [cart]);

  useEffect(() => {
  // call backend after selections change
  async function applySelection() {
    const requests = Object.entries(selectedOptions).map(([productId, optionId]) =>
      axios.put(`/api/cart-items/${productId}`, { deliveryOptionId: optionId })
    );
    await Promise.all(requests);
    await loadCart();
  }
  if (Object.keys(selectedOptions).length > 0) {
    applySelection();
  }
}, [selectedOptions]);


  const handleDeliveryChange = (productId, optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: optionId,
    }));
  };

  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader cart={cart}/>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} selectedOptions={selectedOptions} handleDeliveryChange={handleDeliveryChange} loadCart={loadCart}/>

          <PaymentSummary cart={cart} paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}
