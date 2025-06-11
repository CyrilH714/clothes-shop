import { useState, useEffect } from 'react';
import { getUser } from '../../services/authService';
import NavBar from '../../components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import LogInPage         from '../LogInPage/LogInPage';
import SignUpPage        from '../SignUpPage/SignUpPage';
import UserProfilePage   from '../UserProfilePage/UserProfilePage';
import BasketPage        from '../BasketPage/BasketPage';
import CheckoutPage      from '../CheckoutPage/CheckoutPage';
import ClothingListPage  from '../ClothingListPage/ClothingListPage';
import ClothingItemPage  from '../ClothingItemPage/ClothingItemPage';
import ErrorPage      from '../ErrorPage/ErrorPage'; 
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
const [basketItems, setBasketItems]=useState([])

  function handleAddToBasket(item) {
    setBasketItems(prev => addItemToBasket(prev, item));
  setBasket()
}
 useEffect(()=>{
  localStorage.setItem("basket", JSON.stringify(basketItems));
},[basketItems])  
return (
  <>
    <NavBar user={user} basketCount={basketItems.length}  />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login"   element={<LogInPage />} />
        <Route path="/signup"  element={<SignUpPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/items" element={<ClothingListPage />} />
        <Route path="/items/:id" element={<ClothingItemPage onAdd={handleAddToBasket}/>} />
        <Route path="/basket"   element={<BasketPage basketItems={basketItems} setBasketItems={setBasketItems} />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </>
  );
}

