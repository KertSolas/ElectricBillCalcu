import React, { useEffect, useState } from 'react';
import { getBillHistory } from '../services/billService';
import { Bill } from '../types/Bill';
import { Shop } from '../types/Shop';
import { getShops } from '../services/shopService';
import { deleteBill } from '../services/billService';

const BillHistory: React.FC = () => {
  const [history, setHistory] = useState<Bill[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const shopsData = await getShops(); // assuming getShops is a function that fetches shops data
      setShops(shopsData);
    };
    fetchShops();
  }, [])

  useEffect(() => {
    const fetchHistory = async () => {
      const bills = await getBillHistory();
      console.log("setHistory",setHistory(bills));
      setHistory(bills);
    };
    fetchHistory();
  }, []);

  const handleDeleteBill = async (billId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this bill?');
    if (!confirmDelete) return;

    try {
      await deleteBill(billId); // Call the delete service
      setHistory((prevHistory) => prevHistory.filter((bill) => bill._id !== billId)); // Remove deleted bill from state
      alert('Bill deleted successfully.');
    } catch (error) {
      console.error('Error deleting bill:', error);
      alert('Failed to delete the bill. Please try again.');
    }
  };

  console.log(history);

  return (
    <><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link><div className="container">
      <h2 className="text-center mb-4">Bill History</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Previous Reading</th>
            <th>Current Reading</th>
            <th>Rate</th>
            <th>Total Bill</th>
            <th>Shop</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {history.map((bill) => {
          console.log('bill.shop:', bill.shop);
          console.log('shops:', shops);

          return (
            <tr key={bill._id}>
              <td>{new Date(bill.date).toLocaleDateString()}</td>
              <td>{bill.previousReading}</td>
              <td>{bill.currentReading}</td>
              <td>₱ {bill.rate}</td>
              <td>₱ {bill.calculatedBill}</td>
              <td>{bill.shop.name}</td>
              <td>
                <button
                  onClick={() => handleDeleteBill(bill._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div></>
  );
};

export default BillHistory;