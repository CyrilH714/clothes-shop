import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signUp, storeUser } from '../../services/authService';

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
const from = location.state?.from === "/basket" ? "/checkout" : "/items";
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await signUp(formData);
      storeUser(user);
      setUser(user);
      navigate(from); 

    } catch(err){
      console.log(err);
      alert('Signup failed');
    }
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}