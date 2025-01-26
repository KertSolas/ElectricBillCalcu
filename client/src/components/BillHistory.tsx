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
          </tr>
        </thead>
        <tbody>
          {history.map((bill: Bill) => (
            <tr key={bill._id}>
              <td>{new Date(bill.date).toLocaleDateString()}</td>
              <td>{bill.previousReading}</td>
              <td>{bill.currentReading}</td>
              <td>{bill.rate}</td>
              <td>{bill.calculatedBill}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></>
  );
};

export default BillHistory;