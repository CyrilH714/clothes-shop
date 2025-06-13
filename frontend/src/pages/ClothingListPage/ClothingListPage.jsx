import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { index } from '../../services/itemService';
import './ClothingListPage.css';

export default function ClothingListPage() {
  const [items, setItems] = useState([]);
  const [params] = useSearchParams();
  const category=params.get("category")

  useEffect(() => {
    async function loadItems() {
      const data = await index(category);
      setItems(data);
    }
    loadItems();
  }, [category]);

  return (
    <main className="item-list">
      {items.map(item => (
        <Link to={`/items/${item._id}`} key={item._id} className="card">
          <img src={item.imageURL} alt={item.name} />
          <div className="card-info">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
