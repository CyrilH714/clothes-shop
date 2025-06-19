import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { logIn, storeUser } from '../../services/authService';

export default function LogInPage({ setUser }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
const from = location.state?.from === "/basket" ? "/checkout" : "/items";
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await logIn(credentials);
      storeUser(user);
      setUser(user);
      navigate(from);
    } catch (err) {
      alert('Login failed');
    }
  }

  return (
    <main>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={credentials.email}
          onChange={e => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/signup" state={{ from: location.state?.from }}>
          Sign Up
        </Link>
      </p>
    </main>
  );
}