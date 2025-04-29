import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddBooking() {
  const { id } = useParams(); // booking ID if editing
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service_id: '',
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Load services
    axios
      .get('http://localhost:5000/api/services')
      .then((res) => setServices(res.data))
      .catch(() => toast.error('Failed to load services'));

    // If editing, load existing booking
    if (id) {
      axios
        .get('http://localhost:5000/api/user/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const booking = res.data.find((b) => b.id === parseInt(id));
          if (booking) {
            setForm({
              customer_name: booking.customer_name,
              address: booking.address,
              date_time: booking.date_time.slice(0, 16), // For datetime-local input
              service_id: services.find((s) => s.name === booking.service_name)?.id || '',
            });
          }
        })
        .catch(() => toast.error('Failed to load booking'));
    }
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      service_id: parseInt(form.service_id),
    };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/user/bookings/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Booking updated');
      } else {
        await axios.post('http://localhost:5000/api/bookings', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Booking created');
      }
      navigate('/user-dashboard');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white p-8 shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          {id ? 'Edit Booking' : 'Add Booking'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            placeholder="Customer Name"
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="datetime-local"
            name="date_time"
            value={form.date_time}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <select
            name="service_id"
            value={form.service_id}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {id ? 'Update Booking' : 'Create Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBooking;
