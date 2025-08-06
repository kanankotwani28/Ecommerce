import { formatMoney } from "../../utils/money";
import axios from 'axios';
import dayjs from 'dayjs';
export function DeliveryOptions({cartItem,loadCart,deliveryOptions,selectedId,handleDeliveryChange})
{
    return(
        <div  className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          {deliveryOptions.map((o) => {
            const priceString =
              o.priceCents > 0
                ? `${formatMoney(o.priceCents)} – Shipping`
                : "FREE Shipping";

            const updateDeliveryOption = async () => {
              await axios.put(`/api/cart-items/:${cartItem.productId}`,{
                deliveryOptionId : o.id
              });
              await loadCart();
            }

            return (
              <div key={o.id} className="delivery-option">
                <input
                  type="radio"
                  name={`delivery-option-${cartItem.productId}`}
                  checked={selectedId === o.id}
                  onChange={() =>
                    handleDeliveryChange(cartItem.productId, o.id)
                  }
                  onClick={updateDeliveryOption}
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
    );
}