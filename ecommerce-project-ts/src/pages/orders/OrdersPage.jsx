import "./OrdersPage.css";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { formatMoney } from "../../utils/money";
import { Header } from "../../components/Header";

export function OrdersPage({ cart }) {
  const navigate = useNavigate();

  const [orders, setOrders] = useState(() => {
    const stored = window.localStorage.getItem("orders");
    return stored ? JSON.parse(stored) : [];
  });

  const cancelOrder = async (orderId) => {
    const updatedOrders = orders.filter((o) => o.id !== orderId);
    setOrders(updatedOrders);
    window.localStorage.setItem("orders", JSON.stringify(updatedOrders));

    try {
      await axios.delete(`/api/orders/${orderId}`);
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
      window.localStorage.setItem("orders", JSON.stringify(response.data));
    });
  }, []);

  return (
    <>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        {orders.map((order) => (
          <div key={order.id} className="order-container">
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>{formatMoney(order.totalCostCents)}</div>
                </div>
              </div>
              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
              </div>
            </div>

            <div className="order-details-grid">
              {order.products.map((orderProduct) => (
                <Fragment key={orderProduct.product.id}>
                  <div className="product-image-container">
                    <img src={orderProduct.product.image} alt="" />
                  </div>

                  <div className="product-details">
                    <div className="product-name">{orderProduct.product.name}</div>
                    <div className="product-delivery-date">
                      Arriving on:{" "}
                      {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
                    </div>
                    <div className="product-quantity">
                      Quantity: {orderProduct.quantity}
                    </div>
                    <button
                      className="buy-again-button button-primary"
                      onClick={() => cancelOrder(order.id)}
                    >
                      <img
                        className="buy-again-icon"
                        src="images/icons/buy-again.png"
                        alt=""
                      />
                      <span className="buy-again-message">Cancel Order</span>
                    </button>
                  </div>

                  <div className="product-actions">
                    <a href="/tracking">
                      <button className="track-package-button button-secondary"
                      onClick={() =>
                        navigate("/tracking", {
                          state: {
                            product: orderProduct.product,
                            estimatedDeliveryTimeMs: orderProduct.estimatedDeliveryTimeMs.estimatedDeliveryTimeMs,
                            quantity:orderProduct.quantity,
                            orderId: order.id
                          }}
                        )}>
                        Track package
                      </button>
                    </a>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
