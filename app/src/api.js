import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_HOST =
  Platform.OS === 'web' && typeof window !== 'undefined' && window.location
    ? window.location.hostname
    : '192.168.0.107';

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === 'web' && typeof window !== 'undefined' && window.location
    ? `${window.location.protocol}//${window.location.hostname}:4000/api`
    : `http://${API_HOST}:4000/api`);

let token = null;

export async function loadToken() {
  try {
    token = await AsyncStorage.getItem('edustruc_token');
    return token;
  } catch {
    return null;
  }
}

export async function setToken(value) {
  try {
    token = value;
    if (value) await AsyncStorage.setItem('edustruc_token', value);
    else await AsyncStorage.removeItem('edustruc_token');
  } catch {}
}

async function request(method, path, body, timeoutMs = 3500) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(id);
    throw new Error(`Cannot reach API at ${API_URL}`);
  } finally {
    clearTimeout(id);
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const api = {
  get: (p) => request('GET', p),
  post: (p, b) => request('POST', p, b),
  put: (p, b) => request('PUT', p, b),
  del: (p) => request('DELETE', p),
};
