const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Authenticated users only
router.get('/bookings', verifyToken, userController.getUserBookings);
router.put('/bookings/:id', verifyToken, userController.updateBooking);
router.delete('/bookings/:id', verifyToken, userController.deleteBooking);

module.exports = router;
