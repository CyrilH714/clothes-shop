import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getItemById } from '../../services/itemService';
import './ClothingItemPage.css';


export default function ClothingItemPage({ basketItems, onAdd, onRemove }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      const fetched = await getItemById(id);
      setItem(fetched);
    }
    fetchItem();
  }, [id]);

  const inBasket = basketItems.some(basketItem => basketItem._id === id);

  function handleToggleBasketItem() {
    if (!item) return;
    if (inBasket) {
      onRemove(item._id);
    } else {
      onAdd(item);
    }
  }

  if (!item) return <p>Loading...</p>;

   return (
    <main className="item-page">
      <img src={item.imageURL} alt={item.name} className="item-image" />
      <section className="item-details">
        <h1>{item.name}</h1>
        <p><strong>Brand:</strong> {item.brand}</p>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>Size:</strong> {item.size}</p>
        <p><strong>Condition:</strong> {item.condition}</p>
        <p>{item.about}</p>
        <p className="price">${item.price.toFixed(2)}</p>
<button onClick={() => handleToggleBasketItem(item)}>
  {inBasket ? 'Remove from Basket' : 'Add to Basket'}
</button>
      </section>
    </main>
  );
}