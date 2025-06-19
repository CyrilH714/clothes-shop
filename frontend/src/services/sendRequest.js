import { getToken } from './authService';

export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method, headers: {} };

  const token = getToken();
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (payload) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  const res = await fetch(url, options);

  const contentType = res.headers.get('content-type');
  const isJSON = contentType && contentType.includes('application/json');

  if (!res.ok) {
    const error = isJSON ? await res.json() : { message: 'Unknown error' };
    throw new Error(error.message || 'Request failed');
  }

  return isJSON ? res.json() : res.text(); 
}
