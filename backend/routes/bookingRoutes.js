const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const bookingController = require('../controllers/bookingController');

router.post('/', verifyToken, bookingController.createBooking);

module.exports = router;
