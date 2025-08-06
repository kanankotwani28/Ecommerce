import './TrackingPage.css'
// import { Header } from '../assets/Header';
import {Header} from "../../components/Header.jsx";
import { useLocation, } from "react-router-dom";
import dayjs from 'dayjs';

export function TrackingPage()
{
  const location = useLocation();
  

    const { product, estimatedDeliveryTimeMs, quantity} =
    location.state || {};

    
    return(
        <>
            <Header />

            <div className="tracking-page">
            <div className="order-tracking">
                <a className="back-to-orders-link link-primary" href="/orders">
                View all orders
                </a>

                <div className="delivery-date">Arriving on  {dayjs(estimatedDeliveryTimeMs).format("MMMM D")}</div>

                <div className="product-info">
                {product.name}
                </div>

                <div className="product-info">Quantity:{quantity}</div>

                <img
                className="product-image"
                src={product.image}
                />

                <div className="progress-labels-container">
                <div className="progress-label">Preparing</div>
                <div className="progress-label current-status">Shipped</div>
                <div className="progress-label">Delivered</div>
                </div>

                <div className="progress-bar-container">
                <div className="progress-bar"></div>
                </div>
            </div>
            </div>
        </>
    );
}