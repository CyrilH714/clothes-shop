import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import ClothingItemPage from '../ClothingItemPage/ClothingItemPage';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
cost [basketItems, setBasketItems]=useState([])
function handleAddToBasket(product){
  // const item=
  setBasket()
}
useEffect(()=>{
  localStorage.setItem("basket", JSON.stringify(basketItems));
},[basketItems])  
return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        <Routes>
  <Route path="/items" element={<ClothingItemPage />} />
</Routes>
      </section>
    </main>
  );
}

