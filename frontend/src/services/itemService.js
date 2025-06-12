import sendRequest from "./sendRequest";
const BASE_URL="/api/items";

export const addItemToBasket= (basket, newItem)=>{
    const existing=basket.find(item=>item.id===newItem.id);
    if (existing){
        return basket.map((item)=>{
            item.id===newItem.id?{...item,quantity:item.quantity+1}:item});
        }else{
            return [...basket, newItem];
        }
    };

export async function addToBasket(itemId, qty = 1) {
  return sendRequest('/api/orders/basket/add', 'POST', { itemId, qty });
}

export async function index(category=""){

    const url = category ? `${BASE_URL}?category=${category}` : BASE_URL;
  return sendRequest(url);
}