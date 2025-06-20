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
    console.log(" payload being sent", payload);
  }
console.log("fetching",url,options);
  const res = await fetch(url, options);

  const contentType = res.headers.get('content-type');
  const isJSON = contentType && contentType.includes('application/json');
let data = null;
  
  if (!res.ok) {
  let error = {};
  try {
    error = await res.json();
  } catch (e) {
    console.error("Non-JSON error response", e);
  }
  console.error("Request failed:", res.status, error);
  throw new Error(error.message || `Request failed with status ${res.status}`);
}

  return isJSON ? res.json() : res.text(); 
}
