import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as itemService from '../../services/itemService';

export default function ClothingListPage() {
  const [items, setItems] = useState([]);
  const [searchParams] = useSearchParams();


  const category = searchParams.get('category') || ''; // '' means "all"

  useEffect(() => {
    async function fetchItems() {
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
        <p>No items in stock, come back later!.</p>
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
