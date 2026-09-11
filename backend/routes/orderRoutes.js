const express = require('express');
const router = express.Router();
const { getOrders, updateOrderToDelivered, addOrderItems } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getOrders).post(addOrderItems);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
