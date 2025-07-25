import { formatMoney } from "../utils/money";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./checkout-header.css";
import "./CheckoutPage.css";

export function CheckoutPage({ cart }) {
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
  }, []);

  const handleDeliveryChange = (productId, optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: optionId,
    }));
  };

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" alt="Logo" />
              <img
                className="mobile-logo"
                src="images/mobile-logo.png"
                alt="Logo"
              />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              {cart.length} item{cart.length !== 1 && "s"}
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img
              src="images/icons/checkout-lock-icon.png"
              alt="Secure checkout"
            />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.map((cartItem) => {
              const selectedId =
                selectedOptions[cartItem.productId] ??
                cartItem.delieveryOptionId;
              const opt = deliveryOptions.find((o) => o.id === selectedId);

              return (
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date:{" "}
                    {opt
                      ? dayjs(opt.estimatedDeliveryTimeMs).format(
                          "dddd, MMMM D"
                        )
                      : "Loading…"}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={cartItem.product.image}
                      alt={cartItem.product.name}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((o) => {
                        const priceString =
                          o.priceCents > 0
                            ? `${formatMoney(o.priceCents)} – Shipping`
                            : "FREE Shipping";

                        return (
                          <div key={o.id} className="delivery-option">
                            <input
                              type="radio"
                              name={`delivery-option-${cartItem.productId}`}
                              checked={selectedId === o.id}
                              onChange={() =>
                                handleDeliveryChange(cartItem.productId, o.id)
                              }
                              className="delivery-option-input"
                            />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(o.estimatedDeliveryTimeMs).format(
                                  "dddd, MMMM D"
                                )}
                              </div>
                              <div className="delivery-option-price">
                                {priceString}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({cart.length}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>
                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>
                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>
                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>
                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}
