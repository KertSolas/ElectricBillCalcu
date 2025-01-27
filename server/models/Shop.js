const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }]
});

module.exports = mongoose.model('Shop', ShopSchema);