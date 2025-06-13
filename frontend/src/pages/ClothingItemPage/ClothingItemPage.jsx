import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getItemById } from '../../services/itemService';
import './ClothingItemPage.css';

export default function ClothingItemPage({ onAdd }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    async function fetchItem() {
      const data = await getItemById(id);
      setItem(data);
    }
    fetchItem();
  }, [id]);

  if (!item) return <p>Loading item...</p>;

  function handleAdd() {
    if (onAdd) onAdd(item, quantity);
  } 
  
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

        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={e => setQuantity(parseInt(e.target.value))}
          />
        </label>
        <button onClick={handleAdd} className="add-btn">Add to Basket</button>
      </section>
    </main>
  );
}