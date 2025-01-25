import React from 'react';
import BillHistory from '../components/BillHistory';

const HistoryPage: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">Bill History</h1>
    <BillHistory />
  </div>
);

export default HistoryPage;
