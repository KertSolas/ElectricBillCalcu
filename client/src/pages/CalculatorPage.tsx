import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import { Bill } from '../types/Bill';

const CalculatorPage: React.FC = () => {
  const [calculatedBill, setCalculatedBill] = useState<Bill | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Electric Bill Calculator</h1>
      <InputForm onBillCalculated={setCalculatedBill} />
      {calculatedBill && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="font-bold">Calculation Result</h2>
          <p>Previous Reading: {calculatedBill.previousReading}</p>
          <p>Current Reading: {calculatedBill.currentReading}</p>
          <p>Rate: {calculatedBill.rate}</p>
          <p>Total Bill: {calculatedBill.calculatedBill}</p>
          <p>Date: {new Date(calculatedBill.date).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;
