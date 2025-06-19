import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser, basketCount, setBasketItems }) {
  const navigate = useNavigate();
  const location=useLocation();
  const path=location.pathname;
  const isHome=path==="/";
  const isBasket=path==='/basket';
  function handleLogOut() {
  logOut();
  if (user?.id) {
    localStorage.removeItem(`basket_${user.id}`);
  } else {
    localStorage.removeItem('anon_basket');
  }
  setUser(null);
  setBasketItems([]);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem(`basket_${user?.id}`)
  navigate('/');
}
 return (
    <nav className="nav">
      <div className="left">
        {user?.role === 'admin' && (
  <NavLink className="link" to="/admin">Admin dashboard</NavLink>
)}
        {!isHome && (
        <NavLink className="link gap" to="/">
          Home
        </NavLink>
        )}
        {user ? (
          <div>
          <NavLink className="link" to="/profile">
            Welcome, {user.name}
          </NavLink>
          <button className='link-btn gap' onClick={handleLogOut}>
            log&nbsp;Out
            </button>
            </div>
        ) : (
          <button className="link-btn gap" onClick={()=>navigate("/login", {state:{ from: "/checkout" } })}>
            Log&nbsp;In
          </button>
        )}
      </div>
      <div className="middle">
        <NavLink className='link' to='/items'>See clothes</NavLink>
      </div>
      <div className="right">
{!isBasket && (
          <button className="basket-btn" onClick={() => navigate('/basket')}>
            🛒
            {basketCount > 0 && (
              <span className="badge">{basketCount}</span>
            )}
          </button>
        )}
      </div>
    </nav>
  );
}