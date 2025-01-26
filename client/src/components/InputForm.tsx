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
    <><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link><form onSubmit={handleSubmit} className="needs-validation p-4 border border-secondary rounded">
      <div className="form-group row">
        <label htmlFor="previousReading" className="col-sm-4 col-form-label">Previous Reading</label>
        <div className="col-sm-8">
          <input
            type="number"
            className="form-control"
            id="previousReading"
            name="previousReading"
            placeholder="Previous Reading"
            value={formData.previousReading}
            onChange={handleChange}
            required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="currentReading" className="col-sm-4 col-form-label">Current Reading</label>
        <div className="col-sm-8">
          <input
            type="number"
            className="form-control"
            id="currentReading"
            name="currentReading"
            placeholder="Current Reading"
            value={formData.currentReading}
            onChange={handleChange}
            required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="rate" className="col-sm-4 col-form-label">Rate per Unit</label>
        <div className="col-sm-8">
          <input
            type="number"
            className="form-control"
            id="rate"
            name="rate"
            placeholder="Rate per Unit"
            value={formData.rate}
            onChange={handleChange}
            required />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="date" className="col-sm-4 col-form-label">Date</label>
        <div className="col-sm-8">
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required />
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary mx-auto">Calculate Bill</button>
      </div>
    </form></>
  );
};

export default InputForm;
