import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await api.get('/reports/dashboard');
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{stats?.users?.total || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Total Complaints</h3>
              <p className="text-3xl font-bold text-purple-600">{stats?.complaints?.total || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Pending Complaints</h3>
              <p className="text-3xl font-bold text-orange-600">{stats?.complaints?.pending || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
              <p className="text-3xl font-bold text-green-600">₹{stats?.revenue?.total || 0}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Users Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Residents</span>
                  <span className="font-semibold">{stats?.users?.residents || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Staff</span>
                  <span className="font-semibold">{stats?.users?.staff || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Complaints Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-orange-600">{stats?.complaints?.pending || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">In Progress</span>
                  <span className="font-semibold text-blue-600">{stats?.complaints?.inProgress || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{stats?.complaints?.completed || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Bills Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bills</span>
                  <span className="font-semibold">{stats?.bills?.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid</span>
                  <span className="font-semibold text-green-600">{stats?.bills?.paid || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unpaid</span>
                  <span className="font-semibold text-red-600">{stats?.bills?.unpaid || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Payments</h3>
              <div className="space-y-3">
                {stats?.recentPayments?.length > 0 ? (
                  stats.recentPayments.map((payment) => (
                    <div key={payment._id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{payment.userId?.name}</span>
                      <span className="font-semibold text-green-600">₹{payment.amount}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No recent payments</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
