import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import { toast } from 'react-toastify';

const StaffComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    completionNotes: ''
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get('/complaints');
      setComplaints(data);
    } catch (error) {
      toast.error('Error fetching complaints');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/complaints/${selectedComplaint._id}/status`, formData);
      toast.success('Complaint updated successfully');
      setShowModal(false);
      fetchComplaints();
    } catch (error) {
      toast.error('Error updating complaint');
    }
  };

  const openUpdateModal = (complaint) => {
    setSelectedComplaint(complaint);
    setFormData({
      status: complaint.status,
      completionNotes: complaint.completionNotes || ''
    });
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Assigned Complaints</h2>

          <div className="grid gap-4">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{complaint.title}</h3>
                    <p className="text-gray-600 mb-2">{complaint.description}</p>
                    <p className="text-sm text-gray-500">
                      Resident: {complaint.residentId?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                    {complaint.completionNotes && (
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>Notes:</strong> {complaint.completionNotes}
                      </p>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openUpdateModal(complaint)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Update Status
                </button>
              </div>
            ))}
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <h3 className="text-2xl font-bold mb-4">Update Complaint</h3>
                <p className="text-gray-600 mb-4">{selectedComplaint?.title}</p>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Completion Notes</label>
                    <textarea
                      value={formData.completionNotes}
                      onChange={(e) => setFormData({ ...formData, completionNotes: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      rows="4"
                      placeholder="Add notes about the work done..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StaffComplaints;
