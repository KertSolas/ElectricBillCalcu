import React, { useEffect, useState } from 'react';
import { getBillHistory } from '../services/billService';
import { Bill } from '../types/Bill';

const BillHistory: React.FC = () => {
  const [history, setHistory] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const bills = await getBillHistory();
      setHistory(bills);
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Bill History</h2>
      {history.map((bill: Bill) => (
        <div key={bill._id} className="border p-2 mb-2">
            <p>Previous: {bill.previousReading} | Current: {bill.currentReading}</p>
            <p>Rate: {bill.rate} | Date: {new Date(bill.date).toLocaleDateString()}</p>
            <p>Total Bill: {bill.calculatedBill}</p>
        </div>
        ))}
    </div>
  );
};

export default BillHistory;
