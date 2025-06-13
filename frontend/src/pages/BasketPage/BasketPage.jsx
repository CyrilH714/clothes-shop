import { useNavigate } from 'react-router-dom';
import "./BasketPage.css";

export default function BasketPage({user, basketItems=[], setBasketItems}) {
  const navigate = useNavigate();

  const total=basketItems.reduce(
    (sum, item)=>sum+Number(item.price)*item.quantity||item.price*1, 0);
  
  function handleCheckout() {
    if (!basketItems.length) return(<p>Basket empty</p>)
    user ?
    navigate("/CheckoutPage")
    : navigate('/login', {state: { redirect: '/checkout' } }
    );
  }

  function removeItem(itemId){
    const updated = basketItems.filter(item => item._id !== itemId);
  setBasketItems(updated);
  }
  return (
    <main className="basket">
      <h2>Your Basket</h2>

      {basketItems.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <ul className="basket-list">
            {basketItems.map(item => (
              <li key={item.id} className="row">
                
               <img src={item.img} alt={item.name} /> 
                <span>{item.name}</span>
                <span>${(item.price || 0) * (item.quantity || 1)}</span>
                <button onClick={() => removeItem(item.id)}>✕</button>
              </li>
            ))}
          </ul>

          <div className="total-row">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>

          <button onClick={handleCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>
        </>
      )}
    </main>
  );
}