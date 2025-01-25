const express = require('express');
const { calculateBill, getHistory } = require('../controllers/billController');

const router = express.Router();

router.post('/calculate', calculateBill);
router.get('/history', getHistory);

module.exports = router;
