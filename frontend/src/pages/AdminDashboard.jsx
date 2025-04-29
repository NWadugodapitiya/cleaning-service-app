import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch {
      toast.error('Failed to load bookings');
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch {
      toast.error('Failed to load services');
    }
  };

  const handleAddService = async () => {
    if (!newService.trim()) return;
    try {
      await axios.post(
        'http://localhost:5000/api/admin/services',
        { name: newService },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewService('');
      fetchServices();
      toast.success('Service added');
    } catch {
      toast.error('Failed to add service');
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
      toast.success('Service deleted');
    } catch {
      toast.error('Failed to delete service');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Manage Services (now at the top) */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">Manage Services</h3>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            All Services
          </button>
        </div>

        {/* Bookings (now below Manage Services) */}
        <h3 className="text-xl font-semibold text-blue-600 mb-3">All Bookings</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-2">Customer</th>
                <th className="p-2">Service</th>
                <th className="p-2">Date</th>
                <th className="p-2">Address</th>
                <th className="p-2">Booked By</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="p-2">{b.customer_name}</td>
                  <td className="p-2">{b.service_name}</td>
                  <td className="p-2">{new Date(b.date_time).toLocaleString()}</td>
                  <td className="p-2">{b.address}</td>
                  <td className="p-2">{b.booked_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Services Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-700">Manage Services</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="New service name"
                  className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-300"
                />
                <button
                  onClick={handleAddService}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <ul className="space-y-2">
                  {services.map((s) => (
                    <li
                      key={s.id}
                      className="flex justify-between items-center p-3 border rounded-lg bg-blue-50"
                    >
                      <span>{s.name}</span>
                      <button
                        onClick={() => handleDeleteService(s.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 text-right">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;