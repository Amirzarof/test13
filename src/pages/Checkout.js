import React, { useState } from 'react';
import './Checkout.css';

function Checkout({ cartItems, onBackToCart, onOrderComplete }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
    return requiredFields.every(field => formData[field].trim() !== '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill in all fields');
      return;
    }
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <div className="confirmation-content">
          <div className="confirmation-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase, {formData.firstName}!</p>
          <div className="order-details">
            <p><strong>Order ID:</strong> #{Math.floor(Math.random() * 1000000)}</p>
            <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
            <p><strong>Items:</strong> {itemCount}</p>
            <p><strong>Delivery Address:</strong> {formData.address}, {formData.city} {formData.postalCode}, {formData.country}</p>
          </div>
          <p className="confirmation-message">A confirmation email has been sent to {formData.email}</p>
          <button className="continue-shopping-btn" onClick={onOrderComplete}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Shipping Information</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code *</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
          </fieldset>
          <div className="form-actions">
            <button type="button" className="back-btn" onClick={onBackToCart}>
              Back to Cart
            </button>
            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </div>
        </form>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;