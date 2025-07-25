import { useEffect, useState } from 'react';
import * as userService from '../../services/userService';
import * as orderService from '../../services/orderService';
import './UserProfilePage.css';

export default function UserProfilePage({ user }) {
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    postcode: user?.address?.postcode || '',
    country: user?.address?.country || '',
  });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    async function fetchOrders() {
      try {
        const data = await orderService.getOrdersByUser(user.id);
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    }
    fetchOrders();
  }, [user?.id]);

  async function handleSave() {
    if (!user?.id) return;
    setSaving(true);
    try {
      const updatedUser = {
        ...user,
        address,
      };
      await userService.updateUser(user.id, updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSaveMsg('Saved!');
    } catch (err) {
      console.error(err);
      setSaveMsg('Failed to save.');
    } finally {
      setSaving(false);
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
    <tr key={ord._id}>
      <td>{ord._id.slice(-6)}</td>
      <td>{new Date(ord.updatedAt).toLocaleDateString()}</td>
      <td>${ord.total.toFixed(2)}</td>
      <td>{ord.paid ? "Paid" : "Pending"}</td>
    </tr>
  ))}
</tbody>
          </table>
        )}
      </section>
    </main>
  );
}
