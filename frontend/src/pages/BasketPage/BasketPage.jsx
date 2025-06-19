import { useNavigate } from 'react-router-dom';
import "./BasketPage.css";
import { removeItemFromBasket } from '../../services/itemService';

export default function BasketPage({ user, basketItems = [], setBasketItems }) {
  const navigate = useNavigate();

  const total = basketItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1), 0
  );

  function removeItem(itemId) {
    const updated = removeItemFromBasket(basketItems, itemId);
    setBasketItems(updated);
    if (user?.id) {
      localStorage.setItem(`basket_${user.id}`, JSON.stringify(updated));
    } else {
      localStorage.setItem('anon_basket', JSON.stringify(updated));
    }
  }

  function handleCheckout() {
    if (!basketItems.length) return;
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: "/basket" } });
    }
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
              <li key={item._id} className="row">
                <img src={item.imageURL} alt={item.name} />
                <span>{item.name}</span>
                <span>${(item.price || 0) * (item.quantity || 1)}</span>
                <button onClick={() => removeItem(item._id)}>✕</button>
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
