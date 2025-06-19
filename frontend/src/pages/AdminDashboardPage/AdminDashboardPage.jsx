import { useEffect, useState } from 'react';
import { index, createItem, updateItem, deleteItem } from '../../services/itemService';
import './AdminDashboardPage.css';
export default function AdminDashboardPage() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', brand: '', imageURL: '', size:'', condition:'New', about:'', show:true });

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
      console.log("sending form data:",form);
      setForm({ name: '', price: '', brand: '', imageURL: '',size:'',condition:'New',about:'',show:true });
      index().then(setItems);
    });
  }

  return (
    <main>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>{editingItem ? "Edit Item" : "New Item"}</h3>
        <input
  placeholder="Name"
  value={form.name}
  onChange={e => setForm({ ...form, name: e.target.value })}
/>
<select
  value={form.type || ''}
  onChange={(e) => setForm({ ...form, type: e.target.value })}
>
  <option value="">Select Type</option>
  <option value="dress">Dress</option>
  <option value="top">Top</option>
  <option value="skirt">Skirt</option>
  <option value="outerwear">Outerwear</option>
  <option value="accessory">Accessory</option>
</select>
<input
  placeholder="Price"
  type="number"
  value={form.price}
  onChange={e => setForm({ ...form, price: Number(e.target.value) })}
/>

<input
  placeholder="Brand"
  value={form.brand}
  onChange={e => setForm({ ...form, brand: e.target.value })}
/>

<input
  placeholder="Image URL"
  value={form.imageURL}
  onChange={e => setForm({ ...form, imageURL: e.target.value })}
/>

<input
  placeholder="Size"
  value={form.size}
  onChange={e => setForm({ ...form, size: e.target.value })}
/>

<select
  value={form.condition}
  onChange={e => setForm({ ...form, condition: e.target.value })}
>
  <option value="New">New</option>
  <option value="Like new">Like new</option>
  <option value="Gently used">Gently used</option>
  <option value="Used">Used</option>
  <option value="Worn">Worn</option>
</select>

<textarea
  placeholder="About"
  value={form.about}
  onChange={e => setForm({ ...form, about: e.target.value })}
/>

<label>
  <input
    type="checkbox"
    checked={form.show}
    onChange={e => setForm({ ...form, show: e.target.checked })}
  />
  Show Item Publicly
</label>
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
