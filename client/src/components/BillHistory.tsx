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
      const shopsData = await getShops(); 
      setShops(shopsData);
    };
    fetchShops();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      const bills = await getBillHistory();
      setHistory(bills);
    };
    fetchHistory();
  }, []);

  const handleDeleteBill = async (billId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this bill?');
    if (!confirmDelete) return;

    try {
      await deleteBill(billId);
      setHistory((prevHistory) => prevHistory.filter((bill) => bill._id !== billId)); 
      alert('Bill deleted successfully.');
    } catch (error) {
      console.error('Error deleting bill:', error);
      alert('Failed to delete the bill. Please try again.');
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
      <div className="container">
        <h2 className="text-center mb-4">Bill History</h2>
        
        {/* Table for larger screens */}
        <div className="d-none d-md-block">
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
              {history.map((bill, index) => (
                <tr key={bill._id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                  <td>{new Date(bill.date).toLocaleDateString()}</td>
                  <td>{bill.previousReading}</td>
                  <td>{bill.currentReading}</td>
                  <td>₱ {bill.rate.toFixed(2)}</td>
                  <td>₱ {bill.calculatedBill.toFixed(2)}</td>
                  <td>{bill.shop.name}</td>
                  <td>
                    <button onClick={() => handleDeleteBill(bill._id)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile screens */}
        <div className="d-md-none">
          {history.map((bill) => (
            <div key={bill._id} className="card mb-3 p-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title font-weight-bold text-center" style={{ fontSize: '1.5rem' }}>{bill.shop.name}</h5>
                <div className="d-flex justify-content-between table-secondary text-black p-2">
                  <span><strong>Date:</strong></span> <span>{new Date(bill.date).toLocaleDateString()}</span>
                </div>
                <div className="d-flex justify-content-between bg-light text-black p-2">
                  <span><strong>Previous Reading:</strong></span> <span>{bill.previousReading}</span>
                </div>
                <div className="d-flex justify-content-between table-secondary text-black p-2">
                  <span><strong>Current Reading:</strong></span> <span>{bill.currentReading}</span>
                </div>
                <div className="d-flex justify-content-between bg-light text-black p-2">
                  <span><strong>Rate:</strong></span> <span>₱ {bill.rate.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between table-secondary text-black p-2">
                  <span><strong>Total Bill:</strong></span> <span>₱ {bill.calculatedBill.toFixed(2)}</span>
                </div>
                <div className="text-center mt-2">
                  <button onClick={() => handleDeleteBill(bill._id)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BillHistory;
