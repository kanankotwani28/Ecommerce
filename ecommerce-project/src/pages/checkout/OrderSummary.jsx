import { formatMoney } from "../../utils/money";
import dayjs from 'dayjs';
import { DeliveryOptions } from "./DeliveryOptions";
export function OrderSummary({cart,deliveryOptions,selectedOptions,handleDeliveryChange,loadCart}) {
  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const selectedId =
          selectedOptions[cartItem.productId] ?? cartItem.delieveryOptionId;
        const opt = deliveryOptions.find((o) => o.id === selectedId);

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date:{" "}
              {opt
                ? dayjs(opt.estimatedDeliveryTimeMs).format("dddd, MMMM D")
                : "Loading…"}
            </div>

            <div className="cart-item-details-grid">
              <img
                className="product-image"
                src={cartItem.product.image}
                alt={cartItem.product.name}
              />

              <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity:{" "}
                    <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} handleDeliveryChange={handleDeliveryChange} selectedId={selectedId} loadCart={loadCart}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}
