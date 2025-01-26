import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import { Bill } from '../types/Bill';

const CalculatorPage: React.FC = () => {
  const [calculatedBill, setCalculatedBill] = useState<Bill | null>(null);

  return (
    <>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Calculator</h2>
        </div>
        <div className="card-body">
          <InputForm onBillCalculated={setCalculatedBill} />
          {calculatedBill && (
            <div className="mt-4">
              <h3 className="h5">Calculation Result</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="text-muted">Previous Reading:</span>
                  <span className="float-right">{calculatedBill.previousReading}</span>
                </li>
                <li className="list-group-item">
                  <span className="text-muted">Current Reading:</span>
                  <span className="float-right">{calculatedBill.currentReading}</span>
                </li>
                <li className="list-group-item">
                  <span className="text-muted">Rate:</span>
                  <span className="float-right">{calculatedBill.rate}</span>
                </li>
                <li className="list-group-item">
                  <span className="text-muted">Total Bill:</span>
                  <span className="float-right">{calculatedBill.calculatedBill}</span>
                </li>
                <li className="list-group-item">
                  <span className="text-muted">Date:</span>
                  <span className="float-right">{new Date(calculatedBill.date).toLocaleDateString()}</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div></>
  );
};

export default CalculatorPage;