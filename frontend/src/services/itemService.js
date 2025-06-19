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

export async function fetchBasketFromServer() {
  return sendRequest('/api/orders/basket');
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
export function createItem(data) {
  return sendRequest('/api/items', 'POST', data);
}

export function updateItem(data, id) {
  return sendRequest(`/api/items/${id}`, 'PUT', data);
}

export function deleteItem(id) {
  return sendRequest(`/api/items/${id}`, 'DELETE');
}