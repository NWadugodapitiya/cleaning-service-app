const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Only admins can access these routes
router.get('/bookings', verifyToken, verifyAdmin, adminController.getAllBookings);
router.get('/services', verifyToken, verifyAdmin, adminController.getAllServices);
router.post('/services', verifyToken, verifyAdmin, adminController.addService);
router.delete('/services/:id', verifyToken, verifyAdmin, adminController.deleteService);
router.get('/', adminController.getAllServices);

module.exports = router;
