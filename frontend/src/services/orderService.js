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