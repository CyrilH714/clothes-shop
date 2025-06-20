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
          <button className="home-btn">🏠</button>
        </NavLink>
        )}
        {user ? (
          <div>
            Welcome, {user.name}
          <NavLink className="link" to="/profile">
             <button className="profile-btn">View Profile</button>
          </NavLink>
          <button className='link-btn gap' onClick={handleLogOut}>
            Log Out
            </button>
            </div>
        ) : (
          <button className="link-btn gap" onClick={()=>navigate("/login", {state:{ from: "/checkout" } })}>
            Log&nbsp;In
          </button>
        )}
      </div>
      <div className="middle">
       <button className="btn-clothes" onClick={() => navigate('/items')}>
            See Catalogue
          </button>
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