import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
cost [basketItems, setBasketItems]=useState([JSON.parse(saved)])
useEffect(()=>{
  localStorage.setItem("basket", JSON.stringify(basketItems));
},[basketItems])  
return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        
      </section>
    </main>
  );
}

