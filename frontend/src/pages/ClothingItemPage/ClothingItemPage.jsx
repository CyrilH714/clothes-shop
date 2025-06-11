import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as itemService from '../../services/itemService';

export default function ClothingItemPage() {
  const [items, setItems] = useState([]);
  const [searchParams] = useSearchParams();

  // ?category=bags  →  'bags'
  const category = searchParams.get('category') || ''; // '' means "all"

  useEffect(() => {
    async function fetchItems() {
      // itemService.index can accept an optional category filter
      const data = await itemService.index(category);
      setItems(data);
    }
    fetchItems();
  }, [category]);

  return (
    <section>
      <h2>
        {category ? category[0].toUpperCase() + category.slice(1) : 'All'} Items
      </h2>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
