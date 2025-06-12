import { useNavigate } from 'react-router-dom';
import {addItemToBasket} from "../../services/itemService"
import "./BasketPage.css";

export default function BasketPage({user, items=[], setItems}) {
  const navigate = useNavigate();

  const total=items.reduce(
    (sum, item)=>sum+item.price*item.quantity, 0);
  
  function handleCheckout() {
    if (!items.length) return(<p>Basket empty</p>)
    user ?
    navigate("/CheckoutPage")
    : navigate('/login', {state: { redirect: '/checkout' } }
    );
  }

  function removeItem(id){
    setItems(prev=>prev.filter(item=>item.id!==id))
  }
  return (
    <main className="basket">
      <h2>Your Basket</h2>

      {items.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <ul className="basket-list">
            {items.map(item => (
              <li key={item.id} className="row">
                
               <img src={item.img} alt={item.name} /> 
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
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