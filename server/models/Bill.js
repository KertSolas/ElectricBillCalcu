const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  previousReading: { type: Number, required: true },
  currentReading: { type: Number, required: true },
  rate: { type: Number, required: true },
  date: { type: Date, required: true },
  calculatedBill: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bill', BillSchema);
