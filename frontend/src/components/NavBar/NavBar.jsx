import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
  }
 return (
    <nav className="nav">
      <div className="left">
        <NavLink className="link" to="/">
          Home
        </NavLink>
        {user ? (
          <NavLink className="link" to="/profile">
            Welcome, {user.name}
          </NavLink>
        ) : (
          <NavLink className="link" to="/login">
            Log In
          </NavLink>
        )}
      </div>
      <div className="right">
        <button onClick={() => navigate('/basket')} className="basket-btn">
          🛒
        </button>
      </div>
    </nav>
  );
}