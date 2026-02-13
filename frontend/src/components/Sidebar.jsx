import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    if (user.role === 'Admin') {
      return [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Users', path: '/admin/users' },
        { name: 'Complaints', path: '/admin/complaints' },
        { name: 'Bookings', path: '/admin/bookings' },
        { name: 'Bills', path: '/admin/bills' },
        { name: 'Notices', path: '/admin/notices' },
        { name: 'Audit Logs', path: '/admin/audit-logs' }
      ];
    } else if (user.role === 'Resident') {
      return [
        { name: 'Dashboard', path: '/resident/dashboard' },
        { name: 'Complaints', path: '/resident/complaints' },
        { name: 'Bookings', path: '/resident/bookings' },
        { name: 'Bills', path: '/resident/bills' },
        { name: 'Notices', path: '/resident/notices' }
      ];
    } else if (user.role === 'Staff') {
      return [
        { name: 'Dashboard', path: '/staff/dashboard' },
        { name: 'Assigned Complaints', path: '/staff/complaints' }
      ];
    }
    return [];
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
        bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col
      `}>
        <div className="mb-8 mt-12 lg:mt-0">
          <h2 className="text-2xl font-bold">Smart Community</h2>
          <p className="text-sm text-gray-400">{user.role}</p>
        </div>

        <nav className="space-y-2 flex-1">
          {getNavItems().map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
