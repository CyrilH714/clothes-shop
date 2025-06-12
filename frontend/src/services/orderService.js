import sendRequest from './sendRequest';

export async function checkout(address, paymentMethod) {
  return sendRequest('/api/orders/checkout', 'POST', {
    address,
    paymentMethod,
  });
}