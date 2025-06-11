export async function getOrdersByUser(userId) {
  return fetch(`/api/orders?user=${userId}`).then(r => r.json());
}