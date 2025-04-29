const db = require('../config/db');

exports.createBooking = async (req, res) => {
  const { customer_name, address, date_time, service_id } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      'INSERT INTO bookings (customer_name, address, date_time, service_id, user_id) VALUES (?, ?, ?, ?, ?)',
      [customer_name, address, date_time, service_id, userId]
    );
    res.status(201).json({ message: 'Booking created' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create booking' });
  }
};
