import { useNavigate } from 'react-router-dom';

export default function BasketPage() {
  const navigate = useNavigate();

  function handleCheckout() {
    navigate('/login', {state: { redirect: '/checkout' } }
    );
  }

  return (
    <div>
      <h2>Your Basket</h2>
      {/* basket items... */}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}