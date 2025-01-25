import React, { useState } from 'react';
import { calculateBill } from '../services/billService';
import { Bill } from '../types/Bill';

interface Props {
  onBillCalculated: (bill: Bill) => void;
}

const InputForm: React.FC<Props> = ({ onBillCalculated }) => {
  const [formData, setFormData] = useState({
    previousReading: '',
    currentReading: '',
    rate: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { previousReading, currentReading, rate, date } = formData;
    const billData = {
      previousReading: parseFloat(previousReading),
      currentReading: parseFloat(currentReading),
      rate: parseFloat(rate),
      date,
    };

    try {
      const bill = await calculateBill(billData);
      onBillCalculated(bill);
    } catch (error) {
      alert('Error calculating bill. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="number"
        name="previousReading"
        placeholder="Previous Reading"
        value={formData.previousReading}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="currentReading"
        placeholder="Current Reading"
        value={formData.currentReading}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rate"
        placeholder="Rate per Unit"
        value={formData.rate}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Calculate Bill
      </button>
    </form>
  );
};

export default InputForm;
