const express = require('express');
const { calculateBill, getHistory, deleteBill, deleteAllBills } = require('../controllers/billController');

const router = express.Router();

router.post('/calculate', calculateBill);
router.get('/history', getHistory);
router.delete('/:id', deleteBill);
router.delete('/deleteAllBills', deleteAllBills);

module.exports = router;
