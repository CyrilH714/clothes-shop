import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkout} from '../../services/orderService';
import './CheckoutPage.css';                   

export default function CheckoutPage({ user, basket, clearBasket }) {
  const navigate = useNavigate();

  const total = basket.reduce(
    (sum, item) => sum + item.price,
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
  const [processing, setProcessing] = useState(false);
  const [error, setError]= useState('');

  const isAddressComplete = Object.values(address).every(Boolean);
  const canOrder= isAddressComplete && payment && basket.length > 0 && !processing;

  async function handleOrderNow() {
    if (!canOrder) return;
    try{
        setProcessing(true);
        await checkout(address,payment)
        clearBasket();
    navigate('/confirmation');   
  } catch(error){
    setError(error.message);
    setProcessing(false)
  }}

  return (
    <main className="checkout">
      <h1>Checkout</h1>
      <section className="summary">
        <h2>Order Summary</h2>
        {basket.map(item => (
          <div key={item.id} className="row">
            <span>{item.name} </span>
            <span>${(item.price ).toFixed(2)}</span>
          </div>
        ))}
        <div className="row total">
          <strong>Total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </section>
      <section className="address">
        <h2>Shipping Address</h2>
        {['name','street','city','postcode','country'].map(key=>(
        <input
        key={key}
          placeholder={key[0].toUpperCase()+key.slice(1)}
          value={address[key]}
          onChange={event => setAddress({ ...address, [key]: event.target.value })}/>
        ))}
      </section>
      <section className="payment">
        <h2>Payment Method</h2>
        {["card","paypal"].map(option=>(
        <label key={option}>
          <input
            type="radio"
            name="pay"
            value={option}
            checked={payment === option}
            onChange={event => setPayment(event.target.value)}
          />
          {option==="card"?"Credit/Debit card":"PayPal"}
        </label>
        ))}
      </section>
      {error && <p className="error">{error}</p>}
      <button
        className="order-btn"
        disabled={!canOrder}
        onClick={handleOrderNow}
      >
        {processing?"Processing...":"Order Now"}
      </button>
    </main>
  );
}
