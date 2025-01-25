const Bill = require('../models/Bill');

// Calculate and Save Bill
const calculateBill = async (req, res) => {
  const { previousReading, currentReading, rate, date } = req.body;

  if (!previousReading || !currentReading || !rate || !date) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const unitsConsumed = currentReading - previousReading;
    if (unitsConsumed < 0) {
      return res.status(400).json({ message: 'Current reading must be greater than previous reading.' });
    }

    const calculatedBill = unitsConsumed * rate;

    const newBill = await Bill.create({
      previousReading,
      currentReading,
      rate,
      date,
      calculatedBill,
    });

    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Bill History
const getHistory = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { calculateBill, getHistory };
