import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { index } from '../../services/itemService';
import './ClothingListPage.css';

export default function ClothingListPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [params] = useSearchParams();
  const category = params.get("category");

  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    async function loadItems() {
      const data = await index(category);
      setItems(data);
    }
    loadItems();
  }, [category]);

  useEffect(() => {
    const filtered = items.filter(item => {
      return (
        item.show &&
        (!search || item.name.toLowerCase().includes(search.toLowerCase())) &&
        (!type || item.type === type) &&
        (!brand || item.brand === brand) &&
        (!size || item.size === size) &&
        (!condition || item.condition === condition) &&
        (!maxPrice || item.price <= maxPrice)
      );
    });
    setFilteredItems(filtered);
  }, [search, type, brand, size, condition, maxPrice, items]);

  return (
    <main>
      <section className="filters">
        <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />

        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="top">Tops</option>
          <option value="skirt">Skirts</option>
          <option value="dress">Dresses</option>
          <option value="outerwear">Outerwear</option>
          <option value="accessory">Accessories</option>
        </select>

        <select value={brand} onChange={e => setBrand(e.target.value)}>
          <option value="">All Brands</option>
          <option value="Hermès">Hermès</option>
          <option value="Prada">Prada</option>
          <option value="Vivienne Westwood">Vivienne Westwood</option>
          <option value="Louis Vuitton">Louis Vuitton</option>
          <option value="Gucci">Gucci</option>
          <option value="Christian Dior">Christian Dior</option>
          <option value="Canada Goose">Canada Goose</option>
        </select>

        <select value={size} onChange={e => setSize(e.target.value)}>
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>

        <select value={condition} onChange={e => setCondition(e.target.value)}>
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Like new">Like new</option>
          <option value="Gently used">Gently used</option>
          <option value="Used">Used</option>
          <option value="Worn">Worn</option>
        </select>

        <label>
          Max Price: ${maxPrice}
          <input
            type="range"
            min="0"
            max="2000"
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </section>

      <section className="item-list">
        {filteredItems.map(item => (
          <Link to={`/items/${item._id}`} key={item._id} className="card">
            <img src={item.imageURL} alt={item.name} />
            <div className="card-info">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
