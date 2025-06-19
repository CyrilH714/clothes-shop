import sendRequest from "./sendRequest";
import { jwtDecode } from 'jwt-decode';
const BASE_URL = '/api/auth';





export async function signUp(userData) {
  const tokenObj = await sendRequest(BASE_URL + '/signup', 'POST', userData);
  const token = typeof tokenObj === 'string' ? tokenObj : tokenObj.token; // Safe fallback
  const user = jwtDecode(token);
  console.log("Decoded user:", user);
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user.user)); 
  return user.user;
}

export async function logIn(credentials) {
  const tokenObj = await sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  const token = typeof tokenObj === 'string' ? tokenObj : tokenObj.token;
  const user = jwtDecode(token);
  console.log("Decoded user:", user);
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user.user)); 
  return user.user;
}


export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function logOut() {
  localStorage.removeItem('token');
}

export function storeUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getStoredUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}
export function isLoggedIn() {
  return !!getToken();
}
