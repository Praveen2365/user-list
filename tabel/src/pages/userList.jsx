import { useState, useEffect } from "react";
import Table from "../components/Table";
import Modal from "../components/Model";
import Button from "../components/AddButton";

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Praveen", email: "praveen@gmail.com", avatar: "👨‍💻" },
    { id: 2, name: "Rahul", email: "rahul@gmail.com", avatar: "👨‍🎓" },
    { id: 3, name: "Priya", email: "priya@gmail.com", avatar: "👩‍💼" },
    { id: 4, name: "Amit", email: "amit@gmail.com", avatar: "👨‍🔧" },
  ]);

  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addUser = (user) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newUser = {
        ...user,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        avatar: getRandomAvatar()
      };
      
      setUsers([...users, newUser]);
      setIsLoading(false);
      
      // Show success animation
      triggerSuccess("User added successfully!");
    }, 600);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    triggerSuccess("User deleted successfully!");
  };

  const updateUser = (updatedUser) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setUsers(
        users.map((user) =>
          user.id === updatedUser.id ? { ...updatedUser, avatar: user.avatar } : user
        )
      );
      setEditUser(null);
      setIsLoading(false);
      triggerSuccess("User updated successfully!");
    }, 600);
  };

  const getRandomAvatar = () => {
    const avatars = ["👨‍💻", "👩‍💻", "👨‍🎓", "👩‍🎓", "👨‍💼", "👩‍💼", "👨‍🔧", "👩‍🔧", "👨‍🍳", "👩‍🍳"];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  const triggerSuccess = (message) => {
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = `
      fixed top-4 right-4
      bg-gradient-to-r from-green-500 to-emerald-600
      text-white px-6 py-4 rounded-xl
      shadow-xl
      transform transition-all duration-500
      z-50
      animate-slideInRight
    `;
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <span class="text-lg">✓</span>
        </div>
        <div>
          <p class="font-semibold">Success!</p>
          <p class="text-sm opacity-90">${message}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.length; // Assuming all are active
  const todayAdded = 0; // You can implement this logic

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-10 animate-fadeIn">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slideIn">
                User Management
              </h1>
              <p className="text-gray-600 mt-2 animate-slideIn animation-delay-100">
                Manage your team members efficiently
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 animate-slideIn animation-delay-200">
              <Button
                text="+ Add New User"
                variant="primary"
                size="large"
                onClick={() => {
                  setEditUser(null);
                  setOpen(true);
                }}
                className="shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all"
                icon="👤"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slideIn animation-delay-300">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Users</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-2">{totalUsers}</h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-green-600 font-medium">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  All systems operational
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Active Users</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-2">{activeUsers}</h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-blue-600 font-medium">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  100% active rate
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Today</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-2">+{todayAdded}</h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-purple-600 font-medium">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Updated just now
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6 animate-slideIn animation-delay-400">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  ✕
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-600 mt-2 ml-1 animate-fadeIn">
                Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} matching "{searchTerm}"
              </p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="animate-slideIn animation-delay-500">
          <Table
            users={filteredUsers}
            onDelete={deleteUser}
            onEdit={(user) => {
              setEditUser(user);
              setOpen(true);
            }}
          />
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-lg font-semibold text-gray-700">
                  {editUser ? "Updating user..." : "Adding new user..."}
                </p>
                <p className="text-gray-500 mt-2">Please wait a moment</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {open && (
          <Modal
            onClose={() => {
              setOpen(false);
              setEditUser(null);
            }}
            onSave={editUser ? updateUser : addUser}
            editUser={editUser}
          />
        )}
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default UserList;