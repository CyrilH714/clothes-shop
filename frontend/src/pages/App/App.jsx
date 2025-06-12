import { useState, useEffect, lazy, Suspense } from 'react';
import { getUser } from '../../services/authService';
import NavBar from '../../components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import LogInPage         from '../LogInPage/LogInPage';
import SignUpPage        from '../SignUpPage/SignUpPage';
import UserProfilePage   from '../UserProfilePage/UserProfilePage';
import BasketPage        from '../BasketPage/BasketPage';
import CheckoutPage      from '../CheckoutPage/CheckoutPage';
const ClothingListPage = lazy(() => import('../ClothingListPage/ClothingListPage'));
import ClothingItemPage  from '../ClothingItemPage/ClothingItemPage';
import ErrorPage      from '../ErrorPage/ErrorPage'; 
import ConfirmationPage from '../ConfirmationPage/ConfirmationPage';
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
<Route path="/items" element={
  <Suspense fallback={<div>Loading...</div>}>
    <ClothingListPage />
  </Suspense>
} />        <Route path="/items/:id" element={<ClothingItemPage onAdd={handleAddToBasket}/>} />
        <Route path="/basket"   element={<BasketPage user={user} items={basketItems} setBasketItems={setBasketItems} />} />
        <Route path="/checkout" element={<CheckoutPage user={user} basket={basketItems} clearBasket={()=>setBasketItems([])}/>} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/confirmation" element={<ConfirmationPage/>}/>
      </Routes>
      </>
  );
}

