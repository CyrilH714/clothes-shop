import sendRequest from './sendRequest';

export async function checkout(address, paymentMethod) {
  return sendRequest('/api/orders/checkout', 'POST', {
    address,
    paymentMethod,
  });
}
export async function getOrdersByUser(userId) {
  const res = await fetch(`/api/orders?user=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}
export async function addToBasket(itemId, qty=1) {
  console.log(" Sending POST to /api/orders/add with", itemId);
  return sendRequest('/api/orders/add', 'POST', { itemId,qty });
}
export async function removeFromBasket(itemId, qty=1){
  console.log("sending delete request with", itemId);  
    return sendRequest('/api/orders/remove', 'DELETE', { itemId,qty });


}