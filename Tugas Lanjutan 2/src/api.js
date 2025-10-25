import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: { 'X-ADMIN-KEY': 'secretadminkey' }
});

// helper untuk menormalkan list
export async function getList(path) {
  const res = await api.get(path);
  const d = res.data;
  return Array.isArray(d) ? d : (d?.data ?? d?.results ?? []);
}
