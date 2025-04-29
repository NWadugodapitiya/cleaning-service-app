import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AddBooking from './pages/AddBooking';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected route: only logged-in users can access */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute requiredRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-booking"
          element={
            <PrivateRoute requiredRole="user">
              <AddBooking />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-booking/:id"
          element={
            <PrivateRoute requiredRole="user">
              <AddBooking />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>

  );
}

export default App;
