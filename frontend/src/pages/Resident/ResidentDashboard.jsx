import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const ResidentDashboard = () => {
  const [stats, setStats] = useState({
    complaints: 0,
    bookings: 0,
    unpaidBills: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [complaints, bookings, bills] = await Promise.all([
        api.get('/complaints'),
        api.get('/bookings'),
        api.get('/bills')
      ]);

      setStats({
        complaints: complaints.data.length,
        bookings: bookings.data.length,
        unpaidBills: bills.data.filter(b => b.status === 'Unpaid').length
      });
    } catch (error) {
      console.error('Error fetching stats');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Resident Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">My Complaints</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.complaints}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">My Bookings</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.bookings}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Unpaid Bills</h3>
              <p className="text-3xl font-bold text-red-600">{stats.unpaidBills}</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/resident/complaints"
                className="block p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition"
              >
                <h4 className="font-semibold text-blue-600">Raise Complaint</h4>
                <p className="text-sm text-gray-600">Report maintenance issues</p>
              </a>
              <a
                href="/resident/bookings"
                className="block p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition"
              >
                <h4 className="font-semibold text-purple-600">Book Facility</h4>
                <p className="text-sm text-gray-600">Reserve community facilities</p>
              </a>
              <a
                href="/resident/bills"
                className="block p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition"
              >
                <h4 className="font-semibold text-green-600">View Bills</h4>
                <p className="text-sm text-gray-600">Check maintenance bills</p>
              </a>
              <a
                href="/resident/notices"
                className="block p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition"
              >
                <h4 className="font-semibold text-orange-600">View Notices</h4>
                <p className="text-sm text-gray-600">Read community announcements</p>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResidentDashboard;
