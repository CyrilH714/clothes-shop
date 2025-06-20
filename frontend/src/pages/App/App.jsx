import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { fetchBasketFromServer } from '../../services/itemService';
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
import AdminDashboardPage from '../AdminDashboardPage/AdminDashboardPage';
import './App.css';
import { addItemToBasket, removeItemFromBasket } from '../../services/itemService';
import { addToBasket } from '../../services/orderService';
import { removeFromBasket } from '../../services/orderService'; 

console.log("addToBasket from orderService:", addToBasket);
export default function App() {
  const [user, setUser] = useState(null);
  const [basketItems, setBasketItems] = useState([]);
  const location = useLocation();

  const saveBasketForUser = (userId, basket) => {
    localStorage.setItem(`basket_${userId}`, JSON.stringify(basket));
  };

  const getBasketForUser = (userId) => {
    return JSON.parse(localStorage.getItem(`basket_${userId}`)) || [];
  };

  const getAnonBasket = () => {
    return JSON.parse(localStorage.getItem('anon_basket')) || [];
  };

  const saveAnonBasket = (basket) => {
    localStorage.setItem('anon_basket', JSON.stringify(basket));
  };

  const clearBasketStorage = (userId) => {
    if (userId) localStorage.removeItem(`basket_${userId}`);
    else localStorage.removeItem('anon_basket');
  };

  const mergeBaskets = (existing, incoming) => {
    const map = new Map();
    for (const item of [...existing, ...incoming]) {
      if (map.has(item.id)) {
        const stored = map.get(item.id);
        stored.quantity = (stored.quantity || 1) + (item.quantity || 1);
        map.set(item.id, stored);
      } else {
        map.set(item.id, { ...item, quantity: item.quantity || 1 });
      }
    }
    return Array.from(map.values());
  };

 useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  if (savedUser) {
    setUser(savedUser);
    const storedBasket = JSON.parse(localStorage.getItem(`basket_${savedUser.id}`)) || [];
    setBasketItems(storedBasket);
  } else {
    const anonBasket = JSON.parse(localStorage.getItem('anon_basket')) || [];
    setBasketItems(anonBasket);
  }
}, []);

  useEffect(() => {
    if (user?.id) {
      saveBasketForUser(user.id, basketItems);
    } else {
      saveAnonBasket(basketItems);
    }
  }, [basketItems, user]);

  async function handleSetUser(userObj) {
  setUser(userObj);
  localStorage.setItem('user', JSON.stringify(userObj));

  if (!userObj?.id) return;

  const anonBasket = getAnonBasket();
  localStorage.removeItem('anon_basket');

  let serverBasket = [];
  try {
    const result = await fetchBasketFromServer();
    serverBasket = result?.items || [];
  } catch (err) {
    console.error("Error fetching server-side basket:", err);
  }

  const merged = mergeBaskets(serverBasket, anonBasket);
  setBasketItems(merged);
  saveBasketForUser(userObj.id, merged);

  for (const item of anonBasket) {
    try {
      console.log("Calling addToBasket", item)
      await addToBasket(item._id, 1);  
    } catch (err) {
      console.error("Failed to sync item to backend:", item, err);
    }
  }
}

async function handleAddToBasket(item) {
  console.log("handleAddToBasket called", item);

  const updated = addItemToBasket(basketItems, item);
  setBasketItems(updated);

  if (user?._id) {
    console.log("Before addToBasket POST", item._id);
    await addToBasket(item._id, 1);
    console.log("After addToBasket POST");
  } else {
    console.log("Saving to anon basket");
    localStorage.setItem('anon_basket', JSON.stringify(updated));
  }
}


async function handleRemoveFromBasket(itemId) {
  console.log("🗑️ handleRemoveFromBasket called with", itemId);

  const updated = removeItemFromBasket(basketItems, itemId);
  console.log("✅ Updated basket after removal:", updated);
  setBasketItems(updated);

  if (user?.id) {
    localStorage.setItem(`basket_${user.id}`, JSON.stringify(updated));

    try {
      console.log("📡 Calling backend removeFromBasket", itemId);
      await removeFromBasket(itemId); 
    } catch (err) {
      console.error("❌ Failed to remove from backend:", err);
    }
  } else {
    localStorage.setItem('anon_basket', JSON.stringify(updated));
  }
}



  const handleClearBasket = () => {
    setBasketItems([]);
    if (user?.id) clearBasketStorage(user.id);
    else clearBasketStorage(null);
  };

  return (
    <>
      <NavBar
        user={user}
        setUser={(u) => {
          setUser(u);
          if (!u) handleClearBasket();
        }}
        basketCount={basketItems.length}
        setBasketItems={setBasketItems}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage setUser={handleSetUser} />} />
        <Route path="/signup" element={<SignUpPage setUser={handleSetUser} />} />
        <Route path="/profile" element={<UserProfilePage user={user} />} />
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
  path="/admin"
  element={
    user?.role === 'admin' ? (
      <AdminDashboardPage />
    ) : (
      <ErrorPage />
    )
  }
/>
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              user={user}
              basket={basketItems}
              clearBasket={handleClearBasket}
            />
          }
        />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
