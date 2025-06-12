import { addToBasket } from '../../services/itemService';
import { addItemToBasket } from '../../services/itemService';

export default function ClothingItemPage(item,basket,setBasket){
  async function handleAdd() {
   const updated = await addToBasket(item._id, 1);
  setBasket(prev => addItemToBasket(prev, { ...item, quantity: 1 }))
  }
   return(
    <>
    <h1>Clothes item details</h1>
    <button onClick={handleAdd}>Add&nbsp;to&nbsp;Basket</button>
  </>
  )
}