import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import LogInPage from '../LogInPage/LogInPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import BasketPage from '../BasketPage/BasketPage';
import CheckoutPage from '../CheckoutPage/CheckoutPage';
import ClothingItemPage from '../ClothingItemPage/ClothingItemPage';
import ConfirmationPage from '../ConfirmationPage/ConfirmationPage';
import ErrorPage from '../ErrorPage/ErrorPage';

const ClothingListPage = lazy(() => import('../ClothingListPage/ClothingListPage'));

import './App.css';
import { addItemToBasket, removeItemFromBasket } from '../../services/itemService';
import { getUser } from '../../services/authService';

export default function App() {
  const [user, setUser] = useState(null);
  const [basketItems, setBasketItems] = useState([]);
  const navigate = useNavigate();

  // Load user and basket on mount
  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
      const userBasket = JSON.parse(localStorage.getItem(`basket_${storedUser.id}`)) || [];
      setBasketItems(userBasket);
    } else {
      const anonBasket = JSON.parse(localStorage.getItem('basket')) || [];
      setBasketItems(anonBasket);
    }
  }, []);

  // Save basket to localStorage whenever it changes
  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem(`basket_${user.id}`, JSON.stringify(basketItems));
    } else {
      localStorage.setItem('basket', JSON.stringify(basketItems));
    }
  }, [basketItems, user]);

  function handleSetUser(userObj) {
    if (userObj) {
      setUser(userObj);
      const saved = JSON.parse(localStorage.getItem(`basket_${userObj.id}`)) || [];
      setBasketItems(saved);
    } else {
      if (user?.id) {
        localStorage.removeItem(`basket_${user.id}`);
      }
      setUser(null);
      setBasketItems([]);
    }
  }

  function handleAddToBasket(item) {
    setBasketItems(prev => addItemToBasket(prev, item));
  }

  function handleRemoveFromBasket(itemId) {
    setBasketItems(prev => removeItemFromBasket(prev, itemId));
  }

  return (
    <>
      <NavBar
        user={user}
        setUser={handleSetUser}
        basketCount={basketItems.length}
        setBasketItems={setBasketItems}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage setUser={handleSetUser} />} />
        <Route path="/signup" element={<SignUpPage setUser={handleSetUser} />} />
        <Route path="/profile" element={<UserProfilePage user={user} setUser={handleSetUser} />} />
        <Route
          path="/items"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ClothingListPage />
            </Suspense>
          }
        />
        <Route
          path="/items/:id"
          element={
            <ClothingItemPage
              onAdd={handleAddToBasket}
              onRemove={handleRemoveFromBasket}
              basketItems={basketItems}
            />
          }
        />
        <Route
          path="/basket"
          element={
            <BasketPage
              user={user}
              basketItems={basketItems}
              setBasketItems={setBasketItems}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              user={user}
              basket={basketItems}
              clearBasket={() => setBasketItems([])}
            />
          }
        />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
