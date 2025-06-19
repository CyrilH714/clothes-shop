import { useEffect, useState } from 'react';
import { index, createItem, updateItem, deleteItem } from '../../services/itemService';
import './AdminDashboardPage.css';
export default function AdminDashboardPage() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', brand: '', imageURL: '' });

  useEffect(() => {
    index().then(setItems);
  }, []);

  function handleEdit(item) {
    setEditingItem(item._id);
    setForm(item);
  }

  function handleSave() {
    const method = editingItem ? updateItem : createItem;
    const id = editingItem;
    method(form, id).then(() => {
      setEditingItem(null);
      setForm({ name: '', price: '', brand: '', imageURL: '' });
      index().then(setItems);
    });
  }

  return (
    <main>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>{editingItem ? "Edit Item" : "New Item"}</h3>
        {['name', 'price', 'brand', 'imageURL'].map(field => (
          <input
            key={field}
            placeholder={field}
            value={form[field] || ''}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <button onClick={handleSave}>
          {editingItem ? "Update" : "Add"}
        </button>
      </section>

      <section>
        <h3>All Items</h3>
        <ul>
          {items.map(item => (
            <li key={item._id}>
              {item.name} - ${item.price}
              <button onClick={() => handleEdit(item)}>Edit</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
