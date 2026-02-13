import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const StaffDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/complaints');
      setStats({
        total: data.length,
        pending: data.filter(c => c.status === 'Pending').length,
        inProgress: data.filter(c => c.status === 'In Progress').length,
        completed: data.filter(c => c.status === 'Completed').length
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Staff Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Total Assigned</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">In Progress</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <a
              href="/staff/complaints"
              className="block p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition"
            >
              <h4 className="font-semibold text-blue-600">View Assigned Complaints</h4>
              <p className="text-sm text-gray-600">Manage and update complaint status</p>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
