const db = require('../config/db');

exports.getUserBookings = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.query(`
      SELECT b.id, b.customer_name, b.address, b.date_time, s.name AS service_name
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      WHERE b.user_id = ?
      ORDER BY b.date_time DESC
    `, [userId]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get bookings' });
  }
};

exports.updateBooking = async (req, res) => {
  const { customer_name, address, date_time, service_id } = req.body;
  const bookingId = req.params.id;
  const userId = req.user.id;

  try {
    await db.query(`
      UPDATE bookings
      SET customer_name = ?, address = ?, date_time = ?, service_id = ?
      WHERE id = ? AND user_id = ?
    `, [customer_name, address, date_time, service_id, bookingId, userId]);

    res.json({ message: 'Booking updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update booking' });
  }
};

exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  try {
    await db.query('DELETE FROM bookings WHERE id = ? AND user_id = ?', [bookingId, userId]);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking' });
  }
};
