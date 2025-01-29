const Bill = require('../models/Bill');
const Shop = require('../models/Shop');
const mongoose = require('mongoose');

// Calculate and Save Bill
const calculateBill = async (req, res) => {
  const { previousReading, currentReading, rate, date, shop } = req.body;

  if (!previousReading || !currentReading || !rate || !date || !shop) {
    return res.status(400).json({ message: 'All fields are required, including shop.' });
  }

  try {
    // Validate the shop ID
    const isValidShopId = mongoose.Types.ObjectId.isValid(shop);
    if (!isValidShopId) {
      return res.status(400).json({ message: 'Invalid shop ID.' });
    }

    // Check if the shop exists
    const existingShop = await Shop.findById(shop);
    if (!existingShop) {
      return res.status(404).json({ message: 'Shop not found.' });
    }

    // Calculate units consumed and validate
    const unitsConsumed = currentReading - previousReading;
    if (unitsConsumed < 0) {
      return res.status(400).json({ message: 'Current reading must be greater than previous reading.' });
    }

    const calculatedBill = Number((unitsConsumed * rate).toFixed(2));

    // Create the bill in the database
    const newBill = await Bill.create({
      previousReading,
      currentReading,
      rate,
      date,
      calculatedBill,
      shop, // Pass the shop ID here
    });

    // Populate the shop field in the response
    const populatedBill = await Bill.populate(newBill, { path: 'shop', select: 'name' });

    res.status(201).json(populatedBill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Bill History
const getHistory = async (req, res) => {
  try {
    const bills = await Bill.find().populate('shop', 'name').exec();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteBill = async (req, res) => {
  try {
    const billId = req.params.id;
    const deletedBill = await Bill.findByIdAndDelete(billId);
    if (!deletedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteAllBills = async (req, res) => {
  try {
    await Bill.deleteMany({});
    res.status(200).json({ message: 'All bills deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
module.exports = { calculateBill, getHistory, deleteBill, deleteAllBills };
