import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {addItemToBasket} from '../../services/itemService';  
import './CheckoutPage.css';                   

export default function CheckoutPage({ user }) {
  const { basket, clearBasket } = addItemToBasket();
  const navigate = useNavigate();

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [address, setAddress] = useState({
    name:     user?.name     || '',
    street:   user?.address?.street   || '',
    city:     user?.address?.city     || '',
    postcode: user?.address?.postcode || '',
    country:  user?.address?.country  || '',
  });

  const [payment, setPayment] = useState(''); // e.g. 'card' or 'paypal'

  const isAddressComplete = Object.values(address).every(Boolean);
  const canOrder= isAddressComplete && payment && basket.length > 0;

  function handleOrderNow() {
    if (!canOrder) return;
    clearBasket();
    navigate('/confirmation');                      // or order confirmation page
  }

  return (
    <main className="checkout">
      <h1>Checkout</h1>
      <section className="summary">
        <h2>Order Summary</h2>
        {basket.map(item => (
          <div key={item.id} className="row">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="row total">
          <strong>Total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </section>
      <section className="address">
        <h2>Shipping Address</h2>
        <input
          type="text"
          placeholder="Name"
          value={address.name}
          onChange={e => setAddress({ ...address, name: e.target.value })}/>
        <input
          type="text"
          placeholder="Street"
          value={address.street}
          onChange={e => setAddress({ ...address, street: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={e => setAddress({ ...address, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Postcode"
          value={address.postcode}
          onChange={e => setAddress({ ...address, postcode: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={address.country}
          onChange={e => setAddress({ ...address, country: e.target.value })}
        />
      </section>
      <section className="payment">
        <h2>Payment Method</h2>
        <label>
          <input
            type="radio"
            name="pay"
            value="card"
            checked={payment === 'card'}
            onChange={e => setPayment(e.target.value)}
          />
          Credit / Debit Card
        </label>
        <label>
          <input
            type="radio"
            name="pay"
            value="paypal"
            checked={payment === 'paypal'}
            onChange={e => setPayment(e.target.value)}
          />
          PayPal
        </label>
      </section>
      <button
        className="order-btn"
        disabled={!canOrder}
        onClick={handleOrderNow}
      >
        Order Now
      </button>
    </main>
  );
}
