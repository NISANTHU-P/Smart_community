import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';

import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminComplaints from './pages/Admin/AdminComplaints';
import AdminBookings from './pages/Admin/AdminBookings';
import AdminBills from './pages/Admin/AdminBills';
import AdminNotices from './pages/Admin/AdminNotices';
import AdminAuditLogs from './pages/Admin/AdminAuditLogs';

import ResidentDashboard from './pages/Resident/ResidentDashboard';
import ResidentComplaints from './pages/Resident/ResidentComplaints';
import ResidentBookings from './pages/Resident/ResidentBookings';
import ResidentBills from './pages/Resident/ResidentBills';
import ResidentNotices from './pages/Resident/ResidentNotices';

import StaffDashboard from './pages/Staff/StaffDashboard';
import StaffComplaints from './pages/Staff/StaffComplaints';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/complaints" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminComplaints />
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminBookings />
            </ProtectedRoute>
          } />
          <Route path="/admin/bills" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminBills />
            </ProtectedRoute>
          } />
          <Route path="/admin/notices" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminNotices />
            </ProtectedRoute>
          } />
          <Route path="/admin/audit-logs" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminAuditLogs />
            </ProtectedRoute>
          } />

          {/* Resident Routes */}
          <Route path="/resident/dashboard" element={
            <ProtectedRoute allowedRoles={['Resident']}>
              <ResidentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/resident/complaints" element={
            <ProtectedRoute allowedRoles={['Resident']}>
              <ResidentComplaints />
            </ProtectedRoute>
          } />
          <Route path="/resident/bookings" element={
            <ProtectedRoute allowedRoles={['Resident']}>
              <ResidentBookings />
            </ProtectedRoute>
          } />
          <Route path="/resident/bills" element={
            <ProtectedRoute allowedRoles={['Resident']}>
              <ResidentBills />
            </ProtectedRoute>
          } />
          <Route path="/resident/notices" element={
            <ProtectedRoute allowedRoles={['Resident']}>
              <ResidentNotices />
            </ProtectedRoute>
          } />

          {/* Staff Routes */}
          <Route path="/staff/dashboard" element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <StaffDashboard />
            </ProtectedRoute>
          } />
          <Route path="/staff/complaints" element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <StaffComplaints />
            </ProtectedRoute>
          } />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
