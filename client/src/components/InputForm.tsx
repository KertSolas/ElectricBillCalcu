import React, { useState, useEffect } from 'react';
import { calculateBill } from '../services/billService';
import { Bill } from '../types/Bill';
import { getShops } from '../services/shopService';
import AddShopModal from './AddShopModal';

interface Props {
  onBillCalculated: (bill: Bill) => void;
}

const InputForm: React.FC<Props> = ({ onBillCalculated }) => {
  const [formData, setFormData] = useState({
    previousReading: '',
    currentReading: '',
    rate: '',
    date: '',
    shop: '',
  });

  const [shops, setShops] = useState([]);
  const [showAddShopModal, setShowAddShopModal] = useState(false);

  useEffect(() => {
    // Fetch the shops from the server
    const fetchShops = async () => {
      const shops = await getShops();
      console.log(getShops())
      setShops(shops);
    };
    console.log(fetchShops())
    fetchShops();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShopChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(shops);
    setFormData({ ...formData, shop: e.target.value });
  };

  const handleAddShop = () => {
    setShowAddShopModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { previousReading, currentReading, rate, date} = formData;
    const selectedShop = shops.find((shop) => shop._id === formData.shop);
    console.log(selectedShop);
    if (!selectedShop) {
      console.log(selectedShop);
      console.error('Selected shop not found');
      return;
    }
    const billData = {
      previousReading: parseFloat(previousReading),
      currentReading: parseFloat(currentReading),
      rate: parseFloat(rate),
      date,
      shop: selectedShop._id
    };

    console.log("billData", billData); // Add this line

    try {
      const bill = await calculateBill(billData);
      onBillCalculated(bill);
    } catch (error) {
      console.error(error);
      alert('Error calculating bill. Please try again.');
    }
  };

  return (
    <><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
      <form onSubmit={handleSubmit} className="needs-validation p-4 border border-secondary rounded">
        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Previous Reading</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="previousReading" name="previousReading" value={formData.previousReading} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Current Reading</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="currentReading" name="currentReading" value={formData.currentReading} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Rate</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="rate" name="rate" value={formData.rate} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Date</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Shop</label>
            <div className="col-sm-10">
              {shops.length > 0 ? (
                <select
                className="form-control"
                id="shop"
                name="shop"
                value={formData.shop}
                onChange={handleShopChange}
                required
              >
                <option value="">Select a shop</option>
                {shops.map((shop) => (
                  <option key={shop._id} value={shop._id}>
                    {shop.name}
                  </option>
                ))}
              </select>
              ) : (
                <p className="text-muted">No shops available or loading...</p>
              )}
            </div>
          </div>

        <button type="submit" className="btn btn-primary">Calculate Bill</button>
        <button type="button" className="btn btn-secondary" onClick={handleAddShop}>Add Shop</button>
      </form>
      {showAddShopModal && <AddShopModal onClose={() => setShowAddShopModal(false)} />}
    </>
  );
};

export default InputForm;