// client/src/services/shopService.ts
import axios from 'axios';
import { Shop } from '../types/Shop';

const API_URL = 'https://electric-bill-calcu-server.vercel.app/api/shops';

const getShops = async (): Promise<Shop[]> => {
  const response = await axios.get(`${API_URL}/getShops`);
  return response.data;
};

const createShop = async (shopData: Omit<Shop, '_id' | 'createdAt'>): Promise<Shop> => {
  const response = await axios.post(`${API_URL}/createShop`, shopData);
  return response.data;
};

const updateShop = async (shopId: string, shopData: Omit<Shop, '_id' | 'createdAt'>): Promise<Shop> => {
  const response = await axios.put(`${API_URL}/${shopId}`, shopData);
  return response.data;
};

const deleteShop = async (shopId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${shopId}`);
};

export { getShops, createShop, updateShop, deleteShop };