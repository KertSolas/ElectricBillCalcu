const Shop = require('../models/Shop');

const createShop = async (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Name is required.' });
  }

  try {
    const newShop = await Shop.create({
      name,
    });
    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getShopNames = async (req, res) => {
  try {
    const shops = await Shop.find();
    const shopNames = shops.map((shop) => shop.name);
    res.status(200).json(shopNames);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

const getShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

const deleteShop = async (req, res) => {
    try {
      const shopId = req.params.id;
      await Shop.findByIdAndDelete(shopId);
      res.status(200).json({ message: 'Shop deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

const deleteAllShops = async (req, res) => {
  try {
    await Shop.deleteMany({});
    res.status(200).json({ message: 'All shops deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { createShop, getShopNames, getShops, deleteShop, deleteAllShops };
