import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch {
      toast.error('Failed to load your bookings');
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Booking cancelled');
      fetchBookings();
    } catch {
      toast.error('Cancel failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEdit = (bookingId) => {
    navigate(`/edit-booking/${bookingId}`);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Welcome, {user.username}</h2>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <Link
            to="/add-booking"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Booking
          </Link>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mb-3">Your Bookings</h3>
        {bookings.length === 0 ? (
          <p className="text-gray-600">You have no bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="p-2">Service</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Address</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="p-2">{b.service_name}</td>
                    <td className="p-2">{new Date(b.date_time).toLocaleString()}</td>
                    <td className="p-2">{b.address}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(b.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
