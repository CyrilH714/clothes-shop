export async function updateAddress(userId, address) {
  return fetch(`/api/users/${userId}/address`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address),
  }).then(r => r.json());
}