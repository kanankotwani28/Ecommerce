import "./checkout-header.css";
export function CheckoutHeader({cart})
{
    return(
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
    );
}