import { useEffect, useState } from 'react';
import * as userService from '../../services/userService';   // mock API
import * as orderService from '../../services/orderService'; // mock API
import './UserProfilePage.css';

export default function UserProfilePage({ user }) {
  const [address, setAddress] = useState({
    street:   user?.address?.street   || '',
    city:     user?.address?.city     || '',
    postcode: user?.address?.postcode || '',
    country:  user?.address?.country  || '',
  });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      const data = await orderService.getOrdersByUser(user.id); // mock fetch
      setOrders(data);
    }
    fetchOrders();
  }, [user.id]);

  function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value });
}
const [form, setForm] = useState({
  name: user.name,
  email: user.email,
  address: user.address || {},
  password: '',
});
 async function handleSave() {
  try {
    if (!user.id) return;
    await updateUser(user.id, form);  // ← Write this function
    alert('Updated!');
  } catch (err) {
    console.error(err);
    alert('Failed to update');
  }
}
  if (!user) return <p>User details not found</p>;
  return (
    <main className="profile-page">
      <h1>My Profile</h1>
      <section className="section">
        <h2>Account Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>
      <section className="section">
        <h2>Shipping Address</h2>
        <div className="addr-grid">
          <input
            placeholder="Street"
            value={address.street}
            onChange={e => setAddress({ ...address, street: e.target.value })}
          />
          <input
            placeholder="City"
            value={address.city}
            onChange={e => setAddress({ ...address, city: e.target.value })}
          />
          <input
            placeholder="Postcode"
            value={address.postcode}
            onChange={e => setAddress({ ...address, postcode: e.target.value })}
          />
          <input
            placeholder="Country"
            value={address.country}
            onChange={e => setAddress({ ...address, country: e.target.value })}
          />
        </div>
        <button disabled={saving} onClick={handleSave}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        {saveMsg && <span className="msg">{saveMsg}</span>}
      </section>
      <section className="section">
        <h2>Past Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <table className="orders">
            <thead>
              <tr>
                <th>#</th><th>Date</th><th>Total</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(ord => (
                <tr key={ord.id}>
                  <td>{ord.id}</td>
                  <td>{new Date(ord.date).toLocaleDateString()}</td>
                  <td>${ord.total.toFixed(2)}</td>
                  <td>{ord.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
