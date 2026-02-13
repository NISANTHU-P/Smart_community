import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const ResidentNotices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await api.get('/notices');
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Community Notices</h2>

          <div className="grid gap-4">
            {notices.map((notice) => (
              <div key={notice._id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
                <p className="text-gray-600 mb-3">{notice.message}</p>
                <p className="text-sm text-gray-500">
                  Posted on {new Date(notice.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResidentNotices;
