import { useNavigate } from 'react-router-dom';
import {addItemToBasket} from "../../services/itemService"

export default function BasketPage() {
  const navigate = useNavigate();

  function handleCheckout() {
    user ?
    navigate("/CheckoutPage")
    : navigate('/login', {state: { redirect: '/checkout' } }
    );
  }

  return (
    <div>
      <h2>Your Basket</h2>
      <ul>
   {/* basket items... */}
   {items.map((item)=>(
    <li>
<p>{item.name}</p>
// item image
// sum of items cost
// item number
</li>
   ))}
      </ul>
   
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}