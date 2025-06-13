import sendRequest from "./sendRequest";
const BASE_URL="/api/items";

export const addItemToBasket= (basket, newItem)=>{
    if (!newItem || !newItem.id) {
    throw new Error('Invalid item');
  }

  const exists = basket.find(item => item.id === newItem.id);
  if (exists) return basket; 
  return [...basket, newItem];
};

export async function addToBasket(itemId, qty = 1) {
  return sendRequest('/api/orders/basket/add', 'POST', { itemId, qty });
}

export async function index(category=""){

    const url = category ? `${BASE_URL}?category=${category}` : BASE_URL;
  return sendRequest(url);
}
export async function getItemById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export const removeItemFromBasket = (basket, itemId) => {
  return basket.filter(item => item.id !== itemId);
};