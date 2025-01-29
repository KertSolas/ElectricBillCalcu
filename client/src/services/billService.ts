import axios from 'axios';
import { Bill } from '../types/Bill';

const API_URL = 'https://electric-bill-calcu-server.vercel.app/api/bills';

// Exclude `calculatedBill` because it is calculated on the backend
export const calculateBill = async (
  billData: Omit<Bill, '_id' | 'createdAt' | 'calculatedBill'>
): Promise<Bill> => {
  const response = await axios.post(`${API_URL}/calculate`, billData);
  return response.data;
};

export const getBillHistory = async (): Promise<Bill[]> => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};

export const deleteAllBills = async (): Promise<void> => {
  await axios.delete(`${API_URL}/deleteAllBills`);
}

export const deleteBill = async (billId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${billId}`);
}
