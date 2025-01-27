// server/routes/shopRoutes.js
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { createShop, getShopNames, getShops, deleteShop, deleteAllShops } = require('../controllers/shopController');


router.post('/createShop', createShop);
router.get('/getShopNames', getShopNames);
router.get('/getShops', getShops);
router.delete('/:id', deleteShop);
router.delete('/deleteAllShops', deleteAllShops);

module.exports = router;