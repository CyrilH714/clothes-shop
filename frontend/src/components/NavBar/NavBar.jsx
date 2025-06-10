import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    // The <Link> that was clicked will navigate to "/"
  }

  return (
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      &nbsp; | &nbsp;
      
        <>
          <NavLink to="/posts" end>
            Post List
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/posts/new">New Post</NavLink>
          &nbsp; | &nbsp;
          {user ? (
            <>
          <Link to="/" onClick={handleLogOut}>Log Out</Link>
          <span>Welcome, {user.name}</span>
          </>
          ) : (
      <NavLink to="/login">Log In</NavLink>
      )} 
      </>
    </nav>
  );
}