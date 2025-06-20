import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getItemById } from '../../services/itemService';
import './ClothingItemPage.css';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
export default function ClothingItemPage({ basketItems, onAdd, onRemove }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);

const inBasket = basketItems.some(basketItem => basketItem._id === id);
const navigate=useNavigate();

  useEffect(() => {
    async function fetchItem() {
      try{
      const fetched = await getItemById(id);
      if (!fetched||fetched.show===false){
        navigate('/error');
      }else{
      setItem(fetched);
    }}
    catch(err){
      console.error('item not found,',err);
      navigate('/error');
    }}
    fetchItem();
  }, [id,navigate]);

  function handleToggleBasketItem() {
    if (!item) return;
    if (inBasket) {
      console.log("🛒 Button clicked!", item);
      onRemove(item._id);
    } else {
      console.log("🛒 Button clicked!", item);
      onAdd(item);
    }
  }

  if (!item) return <p>Loading...</p>;

   return (
    <main className="item-page">
      <img src={item.imageURL} alt={item.name} className="item-image" />
      <section className="item-details">
        <h1>{item.name}</h1>
        <p><strong>Brand:</strong> {item.brand}</p>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>Size:</strong> {item.size}</p>
        <p><strong>Condition:</strong> {item.condition}</p>
        <p>{item.about}</p>
        <p className="price">${item.price.toFixed(2)}</p>
<button onClick={handleToggleBasketItem}>
  {inBasket ? 'Remove from Basket' : 'Add to Basket'}
</button>
      </section>
    </main>
  );
}