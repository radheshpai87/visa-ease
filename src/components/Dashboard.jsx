import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#be0b32] mb-2">Welcome to your Dashboard, {user.username}!</h1>
            <p className="text-gray-600">Your role is: <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">{user.role}</span></p>
          </div>
          
          <div className="mb-8">
            {user.role === 'applicant' && (
              <div className="space-y-4">
                <p className="text-gray-700 mb-4">Manage your visa applications and track their status.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/applicant-dashboard" className="block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="flex items-center">
                      <svg className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <div>
                        <p className="font-semibold text-lg">Applicant Dashboard</p>
                        <p className="text-sm opacity-90">View all applications</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/apply" className="block bg-gradient-to-r from-[#be0b32] to-[#8c0826] text-white px-6 py-4 rounded-lg hover:from-[#8c0826] hover:to-[#6a0619] transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="flex items-center">
                      <svg className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <div>
                        <p className="font-semibold text-lg">New Application</p>
                        <p className="text-sm opacity-90">Apply for a visa</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {user.role === 'officer' && (
              <div className="space-y-4">
                <p className="text-gray-700 mb-4">Review and manage assigned visa applications.</p>
                <Link to="/officer-dashboard" className="block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <div>
                      <p className="font-semibold text-lg">Officer Dashboard</p>
                      <p className="text-sm opacity-90">Manage assigned applications</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            {user.role === 'admin' && (
              <div className="space-y-4">
                <p className="text-gray-700 mb-4">Manage users and view system analytics.</p>
                <Link to="/admin-dashboard" className="block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-lg">Admin Dashboard</p>
                      <p className="text-sm opacity-90">Manage users and analytics</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
          
          <div className="border-t pt-6">
            <Link to="/" className="inline-block text-gray-600 hover:text-[#be0b32] mb-4">← Back to Home</Link>
            <div>
              <button onClick={logout} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
