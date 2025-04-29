const db = require('../config/db');

exports.getAllBookings = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT b.id, b.customer_name, b.address, b.date_time, s.name AS service_name, u.username AS booked_by
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN users u ON b.user_id = u.id
      ORDER BY b.date_time DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const [services] = await db.query('SELECT * FROM services');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

exports.addService = async (req, res) => {
  const { name } = req.body;
  try {
    await db.query('INSERT INTO services (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Service added' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add service' });
  }
};

exports.deleteService = async (req, res) => {
  const serviceId = req.params.id;
  try {
    await db.query('DELETE FROM services WHERE id = ?', [serviceId]);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
};
