'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { FiUser, FiMail, FiCalendar, FiShield, FiSettings, FiBell, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  if (!isAuthenticated && user === null) {
    // If not authenticated and we finished checking, you could redirect.
    // For now we assume the layout handles it or we show a message.
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-pulse w-12 h-12 bg-indigo-200 rounded-full"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-16 mb-6">
              <div className="relative h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden flex-shrink-0">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                    <FiUser className="w-12 h-12" />
                  </div>
                )}
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 px-5 py-2.5 rounded-full font-medium shadow-sm transition-all text-sm"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
            
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                  <FiShield className="w-4 h-4" />
                  <span className="capitalize">{user.role || 'Buyer'}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FiMail className="w-4 h-4" />
                  <span>{user.email}</span>
                </span>
                {user.createdAt && (
                  <span className="flex items-center space-x-1">
                    <FiCalendar className="w-4 h-4" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Sidebar Menu */}
          <div className="space-y-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
              <button className="w-full flex items-center space-x-3 bg-indigo-50 text-indigo-700 px-4 py-3 rounded-xl font-medium transition-colors">
                <FiUser className="w-5 h-5" />
                <span>Personal Info</span>
              </button>
              <button className="w-full flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-colors mt-1">
                <FiShield className="w-5 h-5" />
                <span>Security</span>
              </button>
              <button className="w-full flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-colors mt-1">
                <FiSettings className="w-5 h-5" />
                <span>Preferences</span>
              </button>
              <button className="w-full flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium transition-colors mt-1">
                <FiBell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <div className="text-gray-900 font-medium px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                      {user.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <div className="text-gray-900 font-medium px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Account Role</label>
                  <div className="text-gray-900 font-medium px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 capitalize">
                    {user.role || 'Buyer'}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-8 flex justify-end">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-sm transition-all hover:shadow">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
